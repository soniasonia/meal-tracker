from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


TOKEN_URL = reverse('meal:login')


def create_user(**kwargs):
    return get_user_model().objects.create_user(**kwargs)


class UserTokenApiTests(TestCase):
    """Test creating user token"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(username='sebix', password='test1234',email='test1@test.com')
        self.testTables = [
            {
                'name': 'Test that a token is created for the user',
                'payload': {
                    'username': 'sebix',
                    'password': 'test1234',
                },
                'expected_status_code': status.HTTP_200_OK,
                'after': (lambda res: self.assertIn('token', res.data))
                },
            {
                'name': 'Test that token is not created if password is incorrect',
                'payload': {
                    'username': 'sebix',
                    'password': 'wrong',
                },
                'expected_status_code': status.HTTP_400_BAD_REQUEST,
                'after': (lambda res: self.assertNotIn('token', res.data))
            },
            {
                'name': 'Test that token is not created if user doesn\'t exist',
                'payload': {
                    'username': 'wrong',
                    'password': 'test1234',
                },
                'expected_status_code': status.HTTP_400_BAD_REQUEST,
                'after': (lambda res: self.assertNotIn('token', res.data))
            },
            {
                'name': 'Test that username and password are required',
                'payload': {
                    'username': 'sebix',
                    'password': '',
                },
                'expected_status_code': status.HTTP_400_BAD_REQUEST,
                'after': (lambda res: self.assertNotIn('token', res.data))
            },

        ]

    def test_test_tables(self):
        for i, test in enumerate(self.testTables):
            res = self.client.post(TOKEN_URL, test["payload"])
            try:
                self.assertEqual(res.status_code, test["expected_status_code"])
            except Exception as e:
                print(f"Test suite {i} failed: {test['name']}")
                raise e
