// Реальный обработчик подключается здесь. Секреты должны оставаться на сервере.
export async function submitBooking(payload,{signal}={}) {
  // Контракт: сервер валидирует name/phone/consent, обеспечивает idempotencyKey,
  // возвращает {confirmed:true, reference:string} лишь после сохранения заявки.
  // Не активировать до согласования политики и места хранения персональных данных.
  throw new Error('DEMO_MODE');
}
