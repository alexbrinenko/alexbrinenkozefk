const images = [
    { title: "Гори", url: "https://picsum.photos/id/1018/400", desc: "Красиві гори" },
    { title: "Ліс", url: "https://picsum.photos/id/1015/400", desc: "Зелений ліс" },
    { title: "Місто", url: "https://picsum.photos/id/1011/400", desc: "Нічне місто" },
    { title: "Море", url: "https://picsum.photos/id/1016/400", desc: "Синє море" },
    { title: "Пляж", url: "https://picsum.photos/id/1020/400", desc: "Пляж і сонце" },
    { title: "Дорога", url: "https://picsum.photos/id/1032/400", desc: "Довга дорога" }
];

const perPage = 4;
let currentPage = 1;
let currentIndex = 0;

const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");

function renderGallery() {
    gallery.innerHTML = "";
    const start = (currentPage - 1) * perPage;
    const pageImages = images.slice(start, start + perPage);

    pageImages.forEach((img, index) => {
        const image = document.createElement("img");
        image.src = img.url;
        image.onclick = () => openModal(start + index);
        gallery.appendChild(image);
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const pages = Math.ceil(images.length / perPage);
    for (let i = 1; i <= pages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.onclick = () => {
            currentPage = i;
            renderGallery();
        };
        pagination.appendChild(btn);
    }
}

function openModal(index) {
    currentIndex = index;
    modal.style.display = "flex";
    updateModal();
}

function updateModal() {
    document.getElementById("modal-img").src = images[currentIndex].url;
    document.getElementById("modal-title").textContent = images[currentIndex].title;
    document.getElementById("modal-desc").textContent = images[currentIndex].desc;
}

document.querySelector(".close").onclick = () => modal.style.display = "none";

document.getElementById("next").onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateModal();
};

document.getElementById("prev").onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModal();
};

renderGallery();