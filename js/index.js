var countDownDate = new Date();
countDownDate = new Date(countDownDate.getFullYear() + 2 , countDownDate.getMonth() + 1 ,);

var x = setInterval(function(){
    var now = new Date();
    var diff = countDownDate - now;

    var months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    var days = Math.floor(diff % (1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24));
    var hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    var seconds = Math.floor(diff % (1000 * 60) / 1000);

    document.getElementById("months").innerHTML = months;
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}, 1000);




// استبدل هذا الرابط بالرابط الذي حصلت عليه من جوجل (Deployment URL)
const scriptURL = 'https://script.google.com/macros/s/AKfycbwjBtBmlZKeaZVToeXPXwVfSTuDMyBPcPtSTtb4d-bD-OBoL3UTDtzmvDiFMk-as6w/exec';
// استهداف جميع النماذج التي تحمل كلاس التوثيق
const forms = document.querySelectorAll('.needs-validation');

// تكرار الكود لكل فورم موجود في الصفحة
forms.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
    } else {
      // إظهار رسالة الانتظار
      Swal.fire({
        title: 'جاري تسجيل بياناتك...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            Swal.fire({
              icon: 'success',
              title: 'تم التسجيل بنجاح!',
              text: 'شكراً لاهتمامك، سنقوم بإشعارك فور انطلاق الموقع.',
              confirmButtonText: 'حسناً',
              confirmButtonColor: '#237920'
            });
            form.reset();
            form.classList.remove('was-validated');
        })
        .catch(error => {
            console.error('Error!', error.message);
            Swal.fire({
              icon: 'error',
              title: 'عذراً!',
              text: 'حدث خطأ أثناء الإرسال، حاول مرة أخرى.',
              confirmButtonText: 'موافق'
            });
        });
    }
  });
});