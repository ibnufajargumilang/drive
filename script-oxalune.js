// Fungsi untuk format tanggal menjadi Date Object
function formatDate(dateString) {
    const [day, month, year] = dateString.split(" ");
    const monthNames = {
        'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3, 'Mei': 4, 'Juni': 5,
        'Juli': 6, 'Agustus': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
    };
    return new Date(year, monthNames[month], day);
}

// Fungsi untuk generate produk dari JSON
function generateProducts(containerId, category) {
    const container = document.getElementById(containerId);
    const filteredProducts = products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const expiryDate = formatDate(product.expiry);
        const today = new Date();
        const isExpired = expiryDate < today;

        const expiredLabel = isExpired ? `<div class="expired-label">Expired</div>` : '';
        
        const productCard = `
            <div class="relative bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 dark:bg-gray-700">
                ${expiredLabel}
                <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover rounded-md">
                <h2 class="text-xl font-semibold mt-4 dark:text-white">${product.title}</h2>
                <p class="text-gray-600 dark:text-gray-300">Gunakan kode: <strong>${product.code}</strong></p>
                <p class="text-gray-500 text-sm dark:text-gray-400">Berlaku hingga: ${product.expiry}</p>
                <a href="${product.link}" class="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">Dapatkan Sekarang</a>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

// Generate produk berdasarkan kategori
generateProducts('promo-terbaik', 'pilihan');
generateProducts('promo-ebook', 'ebook');

// Dark/Light Mode Toggle
const toggleModeBtn = document.getElementById('toggleMode');
const currentMode = localStorage.getItem('theme') || 'light';

document.body.classList.add(currentMode);

toggleModeBtn.addEventListener('click', function() {
    if (document.body.classList.contains('light')) {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');
    }
});
