import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { it, expect, vi, describe } from 'vitest';


import LoginPage from '@/pages/LoginPage.jsx'; 

import { authService } from '@/services/authService'; 



vi.mock('@/services/authService', () => ({
    authService: {
        login: vi.fn(),
        signup: vi.fn(),
    }
}));


describe('LoginPage: Testes de Login e Cadastro (Pontos 1 & 2)', () => {
    const mockLogin = authService.login;
    const mockSignup = authService.signup;

    it('Cenário: Login bem-sucedido', async () => {
        const TEST_EMAIL = 'test@passabola.com';
        mockLogin.mockResolvedValueOnce({ user: { uid: 'user123' } });
        const mockLoginSuccess = vi.fn();

        render(<LoginPage onLoginSuccess={mockLoginSuccess} />);

        fireEvent.change(screen.getByPlaceholderText(/E-mail/i), { target: { value: TEST_EMAIL } });
        fireEvent.change(screen.getByPlaceholderText(/Senha/i), { target: { value: 'senha123' } });
        fireEvent.click(screen.getByText(/Entrar/i));

        await waitFor(() => expect(mockLogin).toHaveBeenCalledWith(TEST_EMAIL, 'senha123'));
        expect(mockLoginSuccess).toHaveBeenCalled();
    });

    it('Cenário: Login com credenciais inválidas', async () => {
        mockLogin.mockRejectedValueOnce({ message: "auth/wrong-password" });
        
        render(<LoginPage onLoginSuccess={() => {}} />);

        fireEvent.change(screen.getByPlaceholderText(/E-mail/i), { target: { value: 'fail@passabola.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Senha/i), { target: { value: 'errada' } });
        fireEvent.click(screen.getByText(/Entrar/i));

        await waitFor(() => expect(screen.getByText(/Erro no login: auth\/wrong-password/i)).toBeInTheDocument());
    });


    it('Cenário: Cadastro bem-sucedido', async () => {
        const TEST_EMAIL = 'new@user.com';
        
        mockSignup.mockResolvedValueOnce({ user: { uid: 'new-user-uid', email: TEST_EMAIL } });
        
        render(<LoginPage onLoginSuccess={() => {}} />);
        
        fireEvent.click(screen.getByText(/Cadastre-se/i)); 

        fireEvent.change(screen.getByPlaceholderText(/E-mail/i), { target: { value: TEST_EMAIL } });
        fireEvent.change(screen.getByPlaceholderText(/Senha/i), { target: { value: 'securepass' } });
        fireEvent.click(screen.getByText(/Cadastrar/i)); 

        await waitFor(() => expect(mockSignup).toHaveBeenCalledWith(TEST_EMAIL, 'securepass'));
        
        await waitFor(() => expect(screen.getByText(/Cadastro realizado com sucesso! Você já pode entrar./i)).toBeInTheDocument());
    });
});
