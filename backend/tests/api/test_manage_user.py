from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

ME_URL = reverse('meal:me')


def create_user(**kwargs):
    return get_user_model().objects.create_user(**kwargs)


class PublicUserApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.testTables = [
            {
                'name': 'Test that unauthorized user cannot retrieve profile',
                'request': (lambda: self.client.get(ME_URL)),
                'expected_status_code': status.HTTP_401_UNAUTHORIZED,
            },
            {
                'name': 'Test that unauthorized user cannot POST profile',
                'request': (lambda: self.client.post(ME_URL, {'username': 'sebix3',
                                                              'password': 'test1234'})),
                'expected_status_code': status.HTTP_401_UNAUTHORIZED,
            },
            {
                'name': 'Test that unauthorized user cannot update profile',
                'request': (lambda: self.client.post(ME_URL, {'username': 'sebix3',
                                                              'password': 'test1234'})),
                'expected_status_code': status.HTTP_401_UNAUTHORIZED,
            },
        ]

    def test_test_tables(self):
        for i, test in enumerate(self.testTables):
            res = test["request"]()
            try:
                self.assertEqual(res.status_code, test["expected_status_code"])

            except Exception as e:
                print(f"Test suite {i} failed: {test['name']}")
                raise e


class ManageUserApiTests(TestCase):
    """Test creating user token"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(username='sebix', password='test1234', email='test1@test.com')
        self.client.force_authenticate(user=self.user)
        self.testTables = [
            {
                'name': 'Test retrieving profile for logged in user',
                'request': (lambda: self.client.get(ME_URL)),
                'expected_status_code': status.HTTP_200_OK,
                'after': (lambda res: self.assertEqual(res.data, {
                    'username': self.user.username,
                    'email': self.user.email
                }))
            },
            {
                'name': 'Test updating the user profile for authenticated user"',
                'request': (lambda: self.client.patch(ME_URL, {'password': 'new1234'})),
                'expected_status_code': status.HTTP_200_OK,
            },
            {
                'name': 'Test that POST is not allowed on the me url',
                'request': (lambda: self.client.post(ME_URL, {})),
                'expected_status_code': status.HTTP_405_METHOD_NOT_ALLOWED,
            },
        ]

    def test_test_tables(self):
        for i, test in enumerate(self.testTables):
            res = test["request"]()
            try:
                self.assertEqual(res.status_code, test["expected_status_code"])
                try:
                    test["after"](res)
                except KeyError:
                    pass

            except Exception as e:
                print(f"Test suite {i} failed: {test['name']}")
                raise e
