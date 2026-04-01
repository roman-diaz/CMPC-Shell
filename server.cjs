const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

const toNum = (v, fallback) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const toTime = (v) => {
  if (!v) return NaN;
  const t = new Date(v).getTime();
  return Number.isFinite(t) ? t : NaN;
};

server.get('/bookingBlEvents', (req, res) => {
  const all = router.db.get('bookingBlEvents.data').value() || [];

  const page = toNum(req.query._page, 1);
  const limit = toNum(req.query._limit, 10);

  const q = String(req.query.q ?? '')
    .trim()
    .toLowerCase();

  const statusId = req.query['status.id'] ? String(req.query['status.id']) : '';
  const bu = req.query.businessUnit ? String(req.query.businessUnit) : '';

  // 👇 fechas que te llegan desde fetchBookingBlEvents
  const dateFrom = req.query.dateFrom ? String(req.query.dateFrom) : '';
  const dateTo = req.query.dateTo ? String(req.query.dateTo) : '';

  const fromTime = dateFrom ? toTime(dateFrom) : NaN;
  const toTimeVal = dateTo ? toTime(dateTo) : NaN;

  let filtered = all;

  if (statusId) filtered = filtered.filter((x) => String(x?.status?.id ?? '') === statusId);
  if (bu) filtered = filtered.filter((x) => String(x?.businessUnit ?? '') === bu);

  if (q) {
    filtered = filtered.filter((x) => {
      const booking = String(x?.booking ?? '').toLowerCase();
      const bl = String(x?.bl ?? '').toLowerCase();
      return booking.includes(q) || bl.includes(q);
    });
  }

  // ✅ filtro por lastMilestoneNotified
  if (Number.isFinite(fromTime) || Number.isFinite(toTimeVal)) {
    filtered = filtered.filter((x) => {
      const t = toTime(x?.lastMilestoneNotified);
      if (!Number.isFinite(t)) return false;

      if (Number.isFinite(fromTime) && t < fromTime) return false;
      if (Number.isFinite(toTimeVal) && t > toTimeVal) return false;
      return true;
    });
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(page, 1), totalPages);

  const start = (safePage - 1) * limit;
  const data = filtered.slice(start, start + limit);

  res.json({
    data,
    pagination: { page: safePage, limit, total, totalPages },
  });
});

server.get('/bookingBlEvents/:bl', (req, res) => {
  const { bl } = req.params;

  const all = router.db.get('bookingBlEvents.data').value() || [];
  const item = all.find((x) => String(x?.bl ?? '') === String(bl));

  if (!item) {
    return res.status(404).json({
      message: `BookingBlEvent not found for bl=${bl}`,
    });
  }

  res.json(item);
});

server.get('/bookingBlEvidence/:bl', (req, res) => {
  const { bl } = req.params;
  const db = router.db;

  let evidence = db.get('bookingBlEvidence').find({ id: bl }).value();

  if (!evidence) {
    evidence = db.get('bookingBlEvidence').find({ bl }).value();
  }

  if (!evidence) {
    return res.status(404).json({ message: 'Evidence not found', bl });
  }

  return res.json(evidence);
});

server.use(router);

server.use(router);

server.listen(3001, () => {
  console.log('API mock running on http://localhost:3001');
});
