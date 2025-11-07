// src/services/__tests__/api.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { it, expect, vi, describe } from 'vitest';
import LoginPage from '@/pages/LoginPage.jsx';



vi.mock('@/services/FirebaseConfig.js', () => ({
  auth: {},
  db: {},
  appId: 'test-app-id',
}));

vi.mock('firebase/auth', () => {
  return {
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
  };
});

vi.mock('firebase/firestore', () => {
  return {
    doc: vi.fn(() => 'mock-doc-ref'),
    setDoc: vi.fn(),
  };
});

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


describe('LoginPage: Testes de Login e Cadastro (Pontos 1 & 2)', () => {
  it('Cenário: Login bem-sucedido', async () => {
    const TEST_EMAIL = 'test@passabola.com';
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: 'user123' } });
    const mockLoginSuccess = vi.fn();

    render(<LoginPage onLoginSuccess={mockLoginSuccess} />);

    fireEvent.change(screen.getByPlaceholderText(/E-mail/i), { target: { value: TEST_EMAIL } });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), { target: { value: 'senha123' } });
    fireEvent.click(screen.getByText(/Entrar/i));

    await waitFor(() => expect(mockLoginSuccess).toHaveBeenCalled());
  });

  it('Cenário: Login com credenciais inválidas', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('auth/wrong-password'));
    
    render(<LoginPage onLoginSuccess={() => {}} />);
    
    fireEvent.change(screen.getByPlaceholderText(/E-mail/i), { target: { value: 'fail@passabola.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), { target: { value: 'errada' } });
    fireEvent.click(screen.getByText(/Entrar/i));
    
    await waitFor(() =>
      expect(screen.getByText(/Erro no login: auth\/wrong-password/i)).toBeInTheDocument()
    );
  });

  it('Cenário: Cadastro bem-sucedido e perfil salvo no Firestore', async () => {
    const TEST_EMAIL = 'new@user.com';
    const TEST_UID = 'new-user-uid';
    
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: TEST_UID, email: TEST_EMAIL },
    });
    setDoc.mockResolvedValueOnce();

    render(<LoginPage onLoginSuccess={() => {}} />);
    
    fireEvent.click(screen.getByText(/Cadastre-se/i));
    fireEvent.change(screen.getByPlaceholderText(/E-mail/i), { target: { value: TEST_EMAIL } });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), { target: { value: 'securepass' } });
    fireEvent.click(screen.getByText(/Cadastrar/i));

    
    await waitFor(() => expect(setDoc).toHaveBeenCalled());

    expect(setDoc).toHaveBeenCalledWith(
      'mock-doc-ref', 
      expect.objectContaining({
        id: TEST_UID,
        email: TEST_EMAIL,
      })
    );

    await waitFor(() =>
      expect(
        screen.getByText(/Cadastro realizado com sucesso! Você já pode entrar./i)
      ).toBeInTheDocument()
    );
  });
});
