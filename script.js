const songs=['Naba Besiza','Uzusithwalele','Mhlobo Wam','Sahlala Phantsi','Alikho','Intambo Emadlephudlephu','Mthandi Womphefumlo Wam','Hanbothula','Uthando','Umlilo Wempiliso'];
const bookingUrl='https://wa.me/27822168822?text='+encodeURIComponent('Hello Butho Vuthela Ministries, I would like to book the ministry. Please share availability and details.');
document.querySelectorAll('[data-booking]').forEach((link)=>link.href=bookingUrl);
const form=document.querySelector('#request-form');
const songSelect=document.querySelector('#song');
const voucherSelect=document.querySelectorAll('input[name="voucher"]');
const voucherInput=document.querySelector('#voucher-reference');
const voucherHint=document.querySelector('#voucher-hint');
const status=document.querySelector('#form-status');
const thankYou=document.querySelector('#thank-you');
const contactPhone=document.querySelector('#phone');
const contactEmail=document.querySelector('#email');
const params=new URLSearchParams(window.location.search);
const requestedSong=params.get('song');
if(songSelect&&requestedSong&&songs.includes(requestedSong))songSelect.value=requestedSong;
function selectedVoucher(){return document.querySelector('input[name="voucher"]:checked')?.value||'1Voucher';}
function updateVoucherField(){const isOne=selectedVoucher()==='1Voucher';voucherInput.type=isOne?'tel':'text';voucherInput.inputMode=isOne?'numeric':'text';voucherInput.pattern=isOne?'[0-9]{16}':'.{4,}';voucherInput.maxLength=isOne?16:80;voucherInput.placeholder=isOne?'Enter the 16-digit 1Voucher number':'Enter the Blu Voucher number / reference';voucherHint.textContent=isOne?'1Voucher uses exactly 16 digits. Do not enter a PIN or password.':'Enter the Blu Voucher reference. Do not enter a PIN or password.';}
voucherSelect.forEach((input)=>input.addEventListener('change',updateVoucherField));
updateVoucherField();
function createWhatsAppUrl(song,voucher,reference,phone,email){const contact=[phone&&`Phone/WhatsApp: ${phone}`,email&&`Email: ${email}`].filter(Boolean).join(' | ');const message=['Hello Butho Vuthela Ministries,','I would like to request an MP3 after manual voucher verification.','Song: '+song,'Voucher brand: '+voucher,'Voucher number/reference: '+reference,'Delivery contact: '+contact].join('\n');return 'https://wa.me/27822168822?text='+encodeURIComponent(message);}
form?.addEventListener('submit',(event)=>{event.preventDefault();if(!form.reportValidity())return;const voucher=selectedVoucher();const reference=voucherInput.value.trim();if(voucher==='1Voucher'&&!/^\d{16}$/.test(reference)){status.textContent='Please enter exactly 16 digits for a 1Voucher number.';voucherInput.focus();return;}if(!contactPhone.value.trim()&&!contactEmail.value.trim()){status.textContent='Please add a phone / WhatsApp number or an email address so the ministry can deliver your song.';contactPhone.focus();return;}const song=songSelect.value;const url=createWhatsAppUrl(song,voucher,reference,contactPhone.value.trim(),contactEmail.value.trim());status.textContent='Your request is ready. WhatsApp will open with the details for manual verification.';thankYou.classList.add('is-visible');thankYou.querySelector('[data-song]').textContent=song;window.open(url,'_blank','noopener');thankYou.scrollIntoView({behavior:'smooth',block:'center'});});
document.querySelectorAll('[data-song-link]').forEach((link)=>{const song=link.dataset.songLink;link.href='download.html?song='+encodeURIComponent(song);});