const sessions = new Map();

function getSession(userId) {
  if (!sessions.has(userId)) {
    sessions.set(userId, { step: "EMPTY" });
  }
  return sessions.get(userId);
}

function updateSession(userId, data) {
  const current = sessions.get(userId) || {};
  sessions.set(userId, { ...current, ...data });
}

function clearSession(userId) {
  sessions.delete(userId);
}

export default {
  getSession,
  updateSession,
  clearSession
};
