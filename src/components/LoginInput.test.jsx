/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import {
    describe, expect, it, vi
} from 'vitest';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput Component', () => {
    it('should handle username typing correctly', async () => {
        // Arrange
        render(<LoginInput login={() => {}} />);
        const usernameInput = screen.getByPlaceholderText('Username');

        // Action
        await userEvent.type(usernameInput, 'usernametest');

        // Assert
        expect(usernameInput).toHaveValue('usernametest');
    });

    it('should handle password typing correctly', async () => {
        // Arrange
        render(<LoginInput login={() => {}} />);
        const passwordInput = screen.getByPlaceholderText('Password');

        // Action
        await userEvent.type(passwordInput, 'mypassword');

        // Assert
        expect(passwordInput).toHaveValue('mypassword');
    });

    it('should call login function when login button is clicked', async () => {
        // Arrange
        const mockLogin = vi.fn();
        render(<LoginInput login={mockLogin} />);

        const usernameInput = screen.getByPlaceholderText('Username');
        await userEvent.type(usernameInput, 'johndoe');

        const passwordInput = screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, 'mypassword');

        const loginButton = screen.getByRole('button', { name: 'Login' });

        // Action
        await userEvent.click(loginButton);

        // Assert
        expect(mockLogin).toBeCalledWith({
            id: 'johndoe',
            password: 'mypassword'
        });
    });
});