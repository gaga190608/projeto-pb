import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from './InteractiveComponents.jsx';

export function EventFormModal({ open, onClose, onSave, initial = null }) {
  const [values, setValues] = useState({
    title: '',
    when: '',
    location: '',
    description: '',
    link: ''
  });
  const [errors, setErrors] = useState({});
  const panelRef = useRef(null);

  useOnClickOutside(panelRef, () => open && onClose());

  useEffect(() => {
    if (open) {
      setValues({
        title: initial?.title ?? '',
        when: initial?.when ?? '',
        location: initial?.location ?? '',
        description: initial?.description ?? '',
        link: initial?.link ?? ''
      });
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, initial]);

  function validate() {
    const e = {};
    if (!values.title.trim()) e.title = 'Título é obrigatório';
    if (!values.when) e.when = 'Data/horário é obrigatório';
    if (!values.location.trim()) e.location = 'Local é obrigatório';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    const payload = {
      id: initial?.id ?? String(Date.now()),
      ...values,
    };
    onSave?.(payload);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl rounded-2xl bg-white p-6 md:p-8 shadow-2xl"
        role="dialog" aria-modal="true"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" aria-label="Fechar">✕</button>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {initial ? 'Editar evento' : 'Criar evento'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              value={values.title}
              onChange={(e) => setValues(v => ({ ...v, title: e.target.value }))}
              className={`mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#523E6C] ${errors.title ? 'border-red-400' : 'border-gray-200'}`}
              placeholder="Workshop de React, Meetup de WebDev…"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Data e hora</label>
              <input
                type="datetime-local"
                value={values.when}
                onChange={(e) => setValues(v => ({ ...v, when: e.target.value }))}
                className={`mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#523E6C] ${errors.when ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.when && <p className="text-xs text-red-500 mt-1">{errors.when}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Local</label>
              <input
                value={values.location}
                onChange={(e) => setValues(v => ({ ...v, location: e.target.value }))}
                className={`mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#523E6C] ${errors.location ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Online / Av. Paulista, 100…"
              />
              {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              rows={4}
              value={values.description}
              onChange={(e) => setValues(v => ({ ...v, description: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#523E6C]"
              placeholder="O que vamos ver? Pré-requisitos? Palestrantes?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Link (opcional)</label>
            <input
              value={values.link}
              onChange={(e) => setValues(v => ({ ...v, link: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#523E6C]"
              placeholder="https://meetup.com/seu-evento"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-[#523E6C] text-white hover:opacity-95">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EventCard({ event, onEdit, onDelete }) {
  const date = useMemo(() => {
    try {
      const d = new Date(event.when);
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = d.toLocaleString('pt-BR', { month: 'short' });
      const ano = d.getFullYear();
      const hora = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${dia} ${mes} ${ano}, ${hora}:${min}`;
    } catch { return event.when; }
  }, [event.when]);

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white shadow-md transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:z-10">
      <div className="p-5">
        <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
        <p className="mt-1 text-sm text-gray-600">{date}</p>
        <p className="mt-1 text-sm text-gray-600">{event.location}</p>
        {event.description && (
          <p className="mt-3 text-sm text-gray-700 line-clamp-3">{event.description}</p>
        )}
        <div className="mt-4 flex items-center gap-3">
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              className="text-sm underline hover:opacity-90"
              rel="noreferrer"
            >
              Ver link
            </a>
          )}
          <button onClick={() => onEdit?.(event)} className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
            Editar
          </button>
          <button onClick={() => onDelete?.(event)} className="text-sm px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export function EventGrid({ events = [], onEdit, onDelete }) {
  if (!events.length) {
    return (
      <div className="w-full max-w-7xl px-4 py-8 text-sm text-gray-600">
        Nenhum evento cadastrado ainda.
      </div>
    );
  }
  return (
    <div className="w-full max-w-7xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map(ev => (
        <EventCard key={ev.id} event={ev} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}