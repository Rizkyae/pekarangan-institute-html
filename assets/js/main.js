/* ============================================================
   Pekarangan Institute — interaksi sisi klien (demo)
   Menu mobile, filter/pencarian katalog & program, FAQ,
   preset nominal donasi + ringkasan, tombol Donasi.
   Tidak ada pembayaran nyata yang diproses.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Toast kecil untuk aksi demo ---------- */
  var toastEl = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 3200);
  }

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    });
  }

  /* ---------- Katalog: pencarian + filter kategori + urutan ---------- */
  var catalogGrid = document.getElementById('product-grid');
  if (catalogGrid) {
    var cards = Array.prototype.slice.call(catalogGrid.querySelectorAll('.card[data-name]'));
    var searchInput = document.getElementById('catalog-search');
    var sortSelect = document.getElementById('catalog-sort');
    var resultsNote = document.getElementById('results-note');
    var emptyNote = document.getElementById('catalog-empty');
    var activeCat = 'Semua';

    function applyCatalog() {
      var q = (searchInput ? searchInput.value : '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var hay = (card.getAttribute('data-name') + ' ' + card.getAttribute('data-cat') + ' ' + card.textContent).toLowerCase();
        var okCat = activeCat === 'Semua' || card.getAttribute('data-cat') === activeCat;
        var okQ = !q || hay.indexOf(q) !== -1;
        var show = okCat && okQ;
        card.style.display = show ? '' : 'none';
        if (show) shown++;
      });
      if (resultsNote) {
        var filtering = q || activeCat !== 'Semua';
        resultsNote.textContent = filtering
          ? (shown > 0 ? 'Menampilkan ' + shown + ' dari ' + cards.length + ' karya contoh' : 'Tidak ada karya yang cocok dengan pencarianmu')
          : 'Semua kategori · XX+ karya contoh';
      }
      if (emptyNote) emptyNote.classList.toggle('show', shown === 0);
    }

    if (searchInput) searchInput.addEventListener('input', applyCatalog);
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        var mode = sortSelect.value;
        var sorted = cards.slice();
        if (mode === 'nama-az') sorted.sort(function (a, b) { return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name')); });
        if (mode === 'nama-za') sorted.sort(function (a, b) { return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name')); });
        sorted.forEach(function (card) { catalogGrid.appendChild(card); });
        applyCatalog();
      });
    }
    document.querySelectorAll('[data-filter-cat]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-filter-cat]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeCat = btn.getAttribute('data-filter-cat');
        applyCatalog();
      });
    });
    var loadMore = document.getElementById('load-more');
    if (loadMore) {
      loadMore.addEventListener('click', function () {
        toast('Tidak ada karya contoh lainnya — ini halaman contoh.');
      });
    }
    applyCatalog();
  }

  /* ---------- Program: pencarian + filter kategori/status ---------- */
  var programGrid = document.getElementById('program-grid');
  if (programGrid) {
    var pCards = Array.prototype.slice.call(programGrid.querySelectorAll('.card[data-name]'));
    var pSearch = document.getElementById('program-search');
    var pCat = document.getElementById('program-cat');
    var pStatus = document.getElementById('program-status');
    var pEmpty = document.getElementById('program-empty');
    function applyProgram() {
      var q = (pSearch ? pSearch.value : '').trim().toLowerCase();
      var shown = 0;
      pCards.forEach(function (card) {
        var hay = (card.getAttribute('data-name') + ' ' + card.textContent).toLowerCase();
        var okQ = !q || hay.indexOf(q) !== -1;
        card.style.display = okQ ? '' : 'none';
        if (okQ) shown++;
      });
      if (pEmpty) pEmpty.classList.toggle('show', shown === 0);
    }
    if (pSearch) pSearch.addEventListener('input', applyProgram);
    if (pCat) pCat.addEventListener('change', applyProgram);
    if (pStatus) pStatus.addEventListener('change', applyProgram);
    applyProgram();
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (it) { it.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
      q.setAttribute('aria-expanded', !wasOpen ? 'true' : 'false');
    });
  });

  /* ---------- Formulir donasi ---------- */
  var amountInput = document.getElementById('amount-input');
  if (amountInput) {
    var sumAmount = document.getElementById('summary-amount');
    var sumTotal = document.getElementById('summary-total');
    var consent = document.getElementById('consent');
    var donateBtn = document.getElementById('donate-submit');
    var success = document.getElementById('form-success');

    function formatRp(n) {
      return 'Rp' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    function currentAmount() {
      var raw = amountInput.value.replace(/[^0-9]/g, '');
      return raw ? parseInt(raw, 10) : 0;
    }
    function renderSummary() {
      var amt = currentAmount();
      if (sumAmount) sumAmount.textContent = amt > 0 ? formatRp(amt) : 'Rp. X.XXX.XXX';
      if (sumTotal) sumTotal.textContent = amt > 0 ? formatRp(amt) : 'Rp. X.XXX.XXX';
    }
    // Ketik nominal sendiri -> ringkasan ikut berubah
    amountInput.addEventListener('input', function () {
      document.querySelectorAll('.preset').forEach(function (p) { p.classList.remove('active'); });
      var custom = document.querySelector('.preset[data-amount="custom"]');
      if (custom) custom.classList.add('active');
      renderSummary();
    });
    // Preset nominal -> isi input & update ringkasan
    document.querySelectorAll('.preset').forEach(function (preset) {
      preset.addEventListener('click', function () {
        document.querySelectorAll('.preset').forEach(function (p) { p.classList.remove('active'); });
        preset.classList.add('active');
        var val = preset.getAttribute('data-amount');
        if (val === 'custom') {
          amountInput.value = '';
          amountInput.focus();
        } else {
          amountInput.value = formatRp(parseInt(val, 10));
        }
        renderSummary();
      });
    });
    // Checkbox persetujuan -> tombol Donasi aktif/nonaktif
    function renderConsent() {
      if (donateBtn && consent) donateBtn.disabled = !consent.checked;
    }
    if (consent) {
      consent.addEventListener('change', renderConsent);
      renderConsent();
    }
    // Metode pembayaran (radio) — visual saja, sesuai Figma
    document.querySelectorAll('input[name="payment"]').forEach(function (radio) {
      radio.addEventListener('change', function () { /* pilihan tersimpan di form */ });
    });
    // Submit demo: tidak memproses pembayaran nyata
    var form = document.getElementById('donation-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!consent || !consent.checked) return;
        if (currentAmount() <= 0) {
          toast('Isi nominal donasi dulu ya.');
          amountInput.focus();
          return;
        }
        if (success) success.classList.add('show');
        if (donateBtn) donateBtn.disabled = true;
        window.scrollTo({ top: success ? success.getBoundingClientRect().top + window.scrollY - 120 : 0, behavior: 'smooth' });
      });
    }
    renderSummary();
  }

  /* ---------- Laporan: filter ledger + aksi demo ---------- */
  var ledgerBody = document.getElementById('ledger-body');
  if (ledgerBody) {
    var rows = Array.prototype.slice.call(ledgerBody.querySelectorAll('tr[data-kategori]'));
    var catFilter = document.getElementById('report-cat');
    function applyLedger() {
      var val = catFilter ? catFilter.value : 'Semua';
      rows.forEach(function (row) {
        row.style.display = (val === 'Semua' || row.getAttribute('data-kategori') === val) ? '' : 'none';
      });
    }
    if (catFilter) catFilter.addEventListener('change', applyLedger);
    applyLedger();
  }
  document.querySelectorAll('[data-demo-action]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      toast('Desain demo — unduhan/ekspor tidak tersedia pada contoh ini.');
    });
  });
})();
