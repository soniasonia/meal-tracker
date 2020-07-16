from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('meal:create_user')

ME_URL = reverse('meal:me')


def create_user(**kwargs):
    return get_user_model().objects.create_user(**kwargs)


class CreateUserApiTests(TestCase):
    """ Test the users API (public)"""

    def setUp(self):
        self.client = APIClient()
        self.testTables = [
            {
                'name': 'Test creating user with valid payload is successful',
                'payload': {
                    'username': 'sebix1',
                    'password': 'test1234',
                    'email': 'test1@test.com'
                },
                'expected_status_code': status.HTTP_201_CREATED,
            },
            {
                'name': 'Test that password must be more than 4 characters',
                'payload': {
                    'username': 'sebix2',
                    'password': 'lol',
                    'email': 'test2@test.com'
                },
                'expected_status_code': status.HTTP_400_BAD_REQUEST,
                'after': (lambda res: self.assertEqual(res.data["password"][0],
                                                       "Ensure this field has at least 5 characters."))

            },
            {
                'name': 'Test creating user that already exists',
                'payload': {
                    'username': 'sebix3',
                    'password': 'test1234',
                    'email': 'test3@test.com'
                },
                'before': (lambda: create_user(username='sebix3', password='test1234', email='test3@test.com')),
                'expected_status_code': status.HTTP_400_BAD_REQUEST,
                'after': (lambda res: self.assertEqual(res.data["password"][0],
                                                       "A user with that username already exists."))
            }
        ]

    def test_test_tables(self):
        for i, test in enumerate(self.testTables):
            try:
                test["before"]()
            except KeyError:
                pass
            res = self.client.post(CREATE_USER_URL, test["payload"])
            try:
                self.assertEqual(res.status_code, test["expected_status_code"])
                try:
                    test["after"](res)
                except KeyError:
                    pass

            except Exception as e:
                print(f"Test suite {i} failed: {test['name']}")
                raise e
