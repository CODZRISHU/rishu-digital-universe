// Netlify Serverless API for Rishu Jha Digital Universe
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '9158153419:AAHiurRHTWWoFFdD4YuVYCmPOeO3kArdRJE';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '1445026579';
const TELEGRAM_PHONE_NUMBER = '9304783530';

// In-memory cache for bookings and messages across function invocations
let memoryBookings = [];
let memoryMessages = [];

const STANDARD_SLOTS = [
  '11:00 AM - 12:00 PM',
  '12:30 PM - 01:30 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM',
  '06:30 PM - 07:30 PM',
  '08:00 PM - 09:00 PM',
  '09:30 PM - 10:30 PM',
];

async function sendTelegramMessage(htmlText) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: htmlText,
        parse_mode: 'HTML',
      }),
    });
    const data = await res.json();
    return data.ok;
  } catch (e) {
    console.error('Telegram dispatch error:', e);
    return false;
  }
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path || '';
  const method = event.httpMethod;
  let body = {};
  if (event.body) {
    try {
      body = JSON.parse(event.body);
    } catch {}
  }

  // Route: POST /bookings
  if (method === 'POST' && path.endsWith('/bookings')) {
    // 1. Weekend validation (Saturday and Sunday only)
    if (body.sessionDate) {
      const [y, m, d] = body.sessionDate.split('-').map(Number);
      const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
      if (day !== 0 && day !== 6) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Appointments can only be scheduled on weekends (Saturday and Sunday) between 11:00 AM and 11:00 PM.',
          }),
        };
      }
    }

    const booking = {
      _id: 'bkg_' + Date.now() + Math.random().toString(36).substring(2, 6),
      serviceId: body.serviceId || '1-on-1 Mentorship',
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone || '',
      sessionDate: body.sessionDate,
      startTime: body.startTime,
      endTime: '60 mins',
      timezone: body.timezone || 'Asia/Kolkata',
      purpose: body.purpose,
      amount: 0,
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/rj-session-direct',
      createdAt: new Date().toISOString(),
    };

    memoryBookings.unshift(booking);

    // Telegram Alert
    const teleText = `
⚡ <b>NEW 1-ON-1 APPOINTMENT BOOKED!</b> ⚡
━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Client:</b> ${booking.customerName}
📧 <b>Email:</b> ${booking.customerEmail}
📱 <b>Phone:</b> ${booking.customerPhone || 'Not provided'}
🎯 <b>Session Topic:</b> ${booking.serviceId}
📅 <b>Date:</b> ${booking.sessionDate}
⏰ <b>Time Slot:</b> ${booking.startTime}
📝 <b>Purpose / Objectives:</b>
<i>${booking.purpose}</i>
━━━━━━━━━━━━━━━━━━━━━━
🌐 <b>Platform:</b> Google Meet Video Call
🚀 <i>Rishu Jha — Personal Digital Universe</i>
    `.trim();

    await sendTelegramMessage(teleText);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: booking,
        message: 'Booking confirmed and scheduled successfully',
        timestamp: new Date().toISOString(),
      }),
    };
  }

  // Route: GET /bookings/slots
  if (method === 'GET' && path.includes('/bookings/slots')) {
    const slots = STANDARD_SLOTS.map(t => ({ startTime: t, endTime: t }));
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: slots, timestamp: new Date().toISOString() }),
    };
  }

  // Route: GET /bookings/admin/all
  if (method === 'GET' && path.includes('/bookings/admin/all')) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: memoryBookings, timestamp: new Date().toISOString() }),
    };
  }

  // Route: POST /contact
  if (method === 'POST' && path.endsWith('/contact')) {
    const msg = {
      _id: 'msg_' + Date.now(),
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      createdAt: new Date().toISOString(),
    };

    memoryMessages.unshift(msg);

    const teleText = `
✉️ <b>NEW CONTACT INQUIRY RECEIVED!</b> ✉️
━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Name:</b> ${msg.name}
📧 <b>Email:</b> ${msg.email}
📌 <b>Subject:</b> ${msg.subject}
💬 <b>Message:</b>
<i>${msg.message}</i>
━━━━━━━━━━━━━━━━━━━━━━
🚀 <i>Rishu Jha — Personal Digital Universe</i>
    `.trim();

    await sendTelegramMessage(teleText);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: msg,
        message: 'Message delivered to Rishu Kumar Jha successfully',
        timestamp: new Date().toISOString(),
      }),
    };
  }

  // Route: GET /contact/admin/all
  if (method === 'GET' && path.includes('/contact/admin/all')) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: memoryMessages, timestamp: new Date().toISOString() }),
    };
  }

  // Route: GET /telegram/status
  if (method === 'GET' && path.includes('/telegram/status')) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          configured: true,
          phoneNumber: TELEGRAM_PHONE_NUMBER,
          chatId: '1445...579',
          hasBotToken: true,
        },
        timestamp: new Date().toISOString(),
      }),
    };
  }

  // Route: POST /telegram/test
  if (method === 'POST' && path.includes('/telegram/test')) {
    const testText = `
🔔 <b>TELEGRAM TEST ALERT!</b> 🔔
━━━━━━━━━━━━━━━━━━━━━━
👋 Hello Rishu Kumar Jha (+91 ${TELEGRAM_PHONE_NUMBER})!
Netlify Serverless Function is online and sending real-time notifications directly to your phone.
    `.trim();

    const ok = await sendTelegramMessage(testText);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: ok,
        message: ok ? 'Test notification sent to Telegram successfully!' : 'Telegram dispatch failed',
        timestamp: new Date().toISOString(),
      }),
    };
  }

  // Fallback for profile / settings / other routes
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      data: {
        name: 'Rishu Kumar Jha',
        headline: 'Programmer Analyst at Cognizant',
        phone: TELEGRAM_PHONE_NUMBER,
      },
      timestamp: new Date().toISOString(),
    }),
  };
};