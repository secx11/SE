const websites = {
  "1": "https://maps.app.goo.gl/KiKgAYwhPcow5itx7",
  "QW4-789-22": "https://maps.app.goo.gl/R1oVAA1srYB6Gwsy8?g_st=ic",
  "QW4-799-3A": "https://maps.app.goo.gl/Vciq98Tor1X98a1E7?g_st=ic",
  "QW4-702": "https://maps.app.goo.gl/iA8AhhuAK3BokvAV9?g_st=ic",
  "QW4-692": "https://maps.app.goo.gl/itaqzXgLaJCqog1E6?g_st=ic",
  "AP2-138-31-168-4": "https://maps.app.goo.gl/YyyiGNozLjRLmbfK6?g_st=iw",
  "37397": "https://maps.app.goo.gl/Gu2ySogCLDNQzH5p8?g_st=ic",
  "Uzs4-51": "https://maps.app.goo.gl/QXgkmbsg6QHwFmRL8?g_st=ic",
  "UZS4-60A-20": "https://maps.app.goo.gl/p1msfw6SAkwhS2W6A?g_st=ic",
  "Uzs4-68": "https://maps.app.goo.gl/D9BATeg8Ds2ywewg6?g_st=ic",
  "UZS4-82-2": "https://maps.app.goo.gl/HH9RnHCbBgkM5HFz6?g_st=ic",
  "Uzs4-91-9A": "https://maps.app.goo.gl/MtrBUga2ozzuakDu6?g_st=ic",
  "UZW9-77": "https://maps.app.goo.gl/jQNgRVMeQB8rfsh6A?g_st=ic",
  "КА3-6": "https://maps.app.goo.gl/qpejoza8oYpeohZ66",
  "КАЗ-2А": "https://maps.app.goo.gl/jiqJo2jJRGKbyg9U8",
};

// عناصر DOM للبحث
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const suggestionsContainer = document.getElementById("suggestions");

// البحث التلقائي مع تأخير
let searchTimer;
if (searchInput) {
  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      showSuggestions(this.value.trim());
    }, 300);
  });

  // ضغط Enter
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch(this.value.trim());
      suggestionsContainer.style.display = "none";
    }
  });
}

// إخفاء الاقتراحات عند النقر خارج الحقل
document.addEventListener("click", function (e) {
  if (!searchInput || !suggestionsContainer) return;
  if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
    suggestionsContainer.style.display = "none";
  }
});

function showSuggestions(searchTerm) {
  if (!suggestionsContainer) return;
  suggestionsContainer.innerHTML = "";
  suggestionsContainer.style.display = "none";

  if (!searchTerm) {
    return;
  }

  const matchingKeys = Object.keys(websites).filter(key =>
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const limitedKeys = matchingKeys.slice(0, 5);

  if (limitedKeys.length > 0) {
    limitedKeys.forEach(key => {
      const suggestionItem = document.createElement("div");
      suggestionItem.textContent = key;
      suggestionItem.className = "suggestion-item";
      suggestionItem.addEventListener("click", () => {
        searchInput.value = key;
        performSearch(key);
        suggestionsContainer.style.display = "none";
      });
      suggestionsContainer.appendChild(suggestionItem);
    });
    suggestionsContainer.style.display = "block";
  }
}

function performSearch(searchTerm) {
  if (!resultsContainer) return;
  resultsContainer.innerHTML = "<p>جارٍ البحث...</p>";

  if (!searchTerm) {
    resultsContainer.innerHTML = "<p>الرجاء إدخال كلمة للبحث</p>";
    resultsContainer.className = "error-message";
    return;
  }

  const foundKey = Object.keys(websites).find(key =>
    key.toLowerCase() === searchTerm.toLowerCase()
  );

  if (foundKey) {
    resultsContainer.innerHTML = "";
    const linkElement = document.createElement("a");
    linkElement.href = websites[foundKey];
    linkElement.textContent = "انقر هنا للانتقال إلى الموقع";
    linkElement.target = "_blank";
    linkElement.className = "result-link";
    resultsContainer.appendChild(linkElement);
  } else {
    resultsContainer.innerHTML = "<p>لم يتم العثور على الموقع المطلوب.</p>";
    resultsContainer.className = "error-message";
  }
}

// عناصر نافذة الملاحظات (لـ index.html)
const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackModal = document.getElementById("feedbackModal");
const closeModal = document.getElementById("closeModal");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackText = document.getElementById("feedbackText");
const feedbackMsg = document.getElementById("feedbackMsg");

// فتح نافذة الملاحظات
if (feedbackBtn) {
  feedbackBtn.onclick = function() {
    feedbackModal.style.display = "flex";
    feedbackMsg.textContent = "";
    feedbackText.value = "";
  };
}

// إغلاق النافذة
if (closeModal) {
  closeModal.onclick = function() {
    feedbackModal.style.display = "none";
  };
}

// إغلاق عند الضغط خارج النموذج
window.onclick = function(event) {
  if (event.target === feedbackModal) {
    feedbackModal.style.display = "none";
  }
};

// إرسال نموذج الملاحظات (لـ index.html)
if (feedbackForm) {
  feedbackForm.onsubmit = function(e) {
    e.preventDefault();
    feedbackMsg.textContent = "تم إرسال الملاحظة بنجاح. شكرًا لك!";
    feedbackText.value = "";
    setTimeout(() => {
      feedbackModal.style.display = "none";
    }, 1800);
  };
}

// عناصر نموذج الملاحظات (لـ feedback.html)
const submitFeedback = document.getElementById("submitFeedback");
const feedbackInput = document.getElementById("feedback");
const nameInput = document.getElementById("name");
const feedbackMsgFeedback = document.getElementById("feedbackMsg");

if (submitFeedback) {
  submitFeedback.onclick = function(e) {
    e.preventDefault();
    if (!feedbackInput.value.trim()) {
      feedbackMsgFeedback.textContent = "الرجاء إدخال ملاحظة أو اقتراح.";
      feedbackMsgFeedback.style.color = "#d63031";
      return;
    }
    feedbackMsgFeedback.textContent = "تم إرسال الملاحظة بنجاح. شكرًا لك!";
    feedbackMsgFeedback.style.color = "#27ae60";
    feedbackInput.value = "";
    nameInput.value = "";
    setTimeout(() => {
      feedbackMsgFeedback.textContent = "";
    }, 3000);
  };
}