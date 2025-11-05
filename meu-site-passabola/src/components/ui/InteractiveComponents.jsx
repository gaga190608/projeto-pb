import React, { useEffect, useRef, useState } from 'react';

// Hook: Fecha quando clica fora
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Modal com Formulário
export function ModalForm({ open, onClose, onSubmit }) {
  const overlayRef = useRef(null);
  const initialFocusRef = useRef(null);

  useOnClickOutside(overlayRef, () => open && onClose());

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      setTimeout(() => initialFocusRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!values.name.trim()) e.name = 'Nome é obrigatório';
    if (!values.email.trim()) e.email = 'Email é obrigatório';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) e.email = 'Email inválido';
    if (!values.message.trim()) e.message = 'Mensagem é obrigatória';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit?.(values);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      <div
        ref={overlayRef}
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl p-8 transition"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          ✕
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">Fale com a gente</h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            ref={initialFocusRef}
            type="text"
            placeholder="Nome"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className={`w-full rounded-lg border px-3 py-2 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className={`w-full rounded-lg border px-3 py-2 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

          <textarea
            rows={4}
            placeholder="Mensagem"
            value={values.message}
            onChange={(e) => setValues({ ...values, message: e.target.value })}
            className={`w-full rounded-lg border px-3 py-2 ${errors.message ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-[#523E6C] text-white rounded-lg">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Dropdown
export function Dropdown({ label = 'Opções', items = [], onSelect }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  useOnClickOutside(rootRef, () => setOpen(false));

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 border rounded-md bg-white hover:shadow-md"
      >
        {label}
      </button>

      {open && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg border rounded-md z-50">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => (onSelect?.(item), setOpen(false))}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}