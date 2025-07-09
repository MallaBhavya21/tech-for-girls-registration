 let shareCount = 0;

const shareBtn = document.getElementById('shareBtn');
const counterText = document.getElementById('shareCounter');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const thankYouMessage = document.getElementById('thankYouMessage');

// ✅ Prevent resubmission using localStorage
if (localStorage.getItem('submitted')) {
  form.style.display = 'none';
  thankYouMessage.classList.remove('hidden');
}

// ✅ Handle WhatsApp Share Button
shareBtn.addEventListener('click', () => {
  if (shareCount < 5) {
    shareCount++;
    window.open(`https://wa.me/?text=Hey Buddy, Join Tech For Girls Community`, '_blank');
    counterText.textContent = `Click count: ${shareCount}/5`;
    if (shareCount === 5) {
      counterText.textContent += " ✅ Sharing complete. Please continue.";
    }
  }
});

// ✅ Handle Form Submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please complete WhatsApp sharing (5 times) before submitting.");
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwiPuge5QEaBNlST_45SA5e7vac0OCajz-6sRLDgJ-qfeBNtc1CGlyxV4His4T556moug/exec', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      localStorage.setItem('submitted', 'true');
      form.reset();
      form.style.display = 'none';
      thankYouMessage.classList.remove('hidden');
    } else {
      alert("Submission failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
});
