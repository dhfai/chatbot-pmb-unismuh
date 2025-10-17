# API Reference - Chatbot Unismuh

**Base URL**: `http://localhost:8000`

---

## 1. Health Check

**GET** `/`

Cek status API.

### Response
```json
{
  "message": "Chatbot Unismuh API is running",
  "status": "healthy",
  "version": "1.0.0"
}
```

---

## 2. Create Session

**POST** `/sessions/create`

Buat session baru untuk mulai chat.

### Request
No body required

### Response
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Session berhasil dibuat"
}
```

---

## 3. Get Session Info

**GET** `/sessions/{session_id}`

Lihat info session.

### Request
- Path parameter: `session_id` (string)

### Response
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2025-10-17T10:30:00",
  "last_activity": "2025-10-17T10:35:00",
  "message_count": 5,
  "context_length": 5
}
```

---

## 4. Chat

**POST** `/chat`

Kirim pesan dan terima response dari chatbot.

### Request
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Apa saja fakultas di Unismuh?"
}
```

### Response
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "response": "Universitas Muhammadiyah memiliki beberapa fakultas...",
  "retrieved_documents": 3,
  "confidence_scores": [0.85, 0.78, 0.65],
  "sources": [
    "data_feb.json - Informasi Fakultas",
    "data_fkip.json - Program Studi",
    "data_ft.json - Fakultas Teknik"
  ]
}
```

### Error Response (404)
```json
{
  "detail": "Session tidak valid atau expired"
}
```

### Error Response (503)
```json
{
  "detail": "Chatbot service belum ready. Tunggu sebentar dan coba lagi."
}
```

---

## 5. Get System Stats

**GET** `/system/stats`

Lihat statistik sistem.

### Response
```json
{
  "total_documents": 150,
  "active_sessions": 5,
  "total_chats_today": 42,
  "index_size": "2.5 MB",
  "model_status": "ready"
}
```

---

## 6. Rebuild Index

**POST** `/system/rebuild-index`

Rebuild vector index (admin only).

### Response
```json
{
  "message": "Index rebuild started in background"
}
```

---

## 7. Cleanup Sessions

**POST** `/system/cleanup-sessions`

Hapus session yang expired.

### Response
```json
{
  "message": "Cleaned up 3 expired sessions",
  "cleaned_sessions": 3
}
```

---

## Quick Example (JavaScript)

```javascript
// 1. Create Session
const response = await fetch('http://localhost:8000/sessions/create', {
  method: 'POST'
});
const { session_id } = await response.json();

// 2. Send Chat Message
const chatResponse = await fetch('http://localhost:8000/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    session_id: session_id,
    message: 'Apa saja fakultas di Unismuh?'
  })
});
const chatData = await chatResponse.json();
console.log(chatData.response);
```

---

## HTTP Status Codes

- `200` - Success
- `404` - Session not found
- `500` - Server error
- `503` - Service not ready
