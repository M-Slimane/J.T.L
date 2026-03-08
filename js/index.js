// --- 1. العداد التنازلي ---
var countDownDate = new Date(new Date().getFullYear() + 2, new Date().getMonth() + 1, 1);
setInterval(function() {
    var now = new Date();
    var diff = countDownDate - now;
    if (document.getElementById("months")) {
        document.getElementById("months").innerHTML = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        document.getElementById("days").innerHTML = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerHTML = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerHTML = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerHTML = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

// --- 2. الروابط (ضع روابطك الكاملة هنا) ---
const emailFormURL = 'https://formspree.io/f/meerowgn';
const regFormURL = 'https://formspree.io/f/mreybdwp';

// --- 3. دالة الإرسال المصححة ---
function handleFormSubmit(form, url, successMsg, callback) {
    Swal.fire({ 
        title: 'جاري الإرسال...', 
        allowOutsideClick: false, 
        didOpen: () => Swal.showLoading() 
    });

    const formData = new FormData(form);

    fetch(url, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({ icon: 'success', title: 'نجاح!', text: successMsg });
            form.reset();
            if (callback) callback();
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'فشل الإرسال');
            });
        }
    })
    .catch(error => {
        Swal.fire({ icon: 'error', title: 'خطأ!', text: 'تعذر الإرسال. تأكد من اتصالك بالإنترنت.' });
        console.error('Formspree Error:', error);
    });
}

// --- 4. تفعيل المعالجة للفورمين ---

// فورم الإيميلات
document.querySelectorAll('.needs-validation').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (this.checkValidity()) {
            handleFormSubmit(this, emailFormURL, 'تم تسجيل بريدك بنجاح.');
        } else {
            this.classList.add('was-validated');
        }
    });
});

// فورم التسجيل
const regForm = document.getElementById('association-form');
if (regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit(this, regFormURL, 'تم تسجيل بياناتك بنجاح.', () => {
            const modalEl = document.getElementById('registrationModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }
        });
    });
}
