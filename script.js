class SearchBook {

    constructor() {

        this.books = [
            {
                title: "Menguasai Pemrograman Berorientasi Objek",
                author: "Ade Rahmat Iskandar",
                publisher: "Informatika",
                year: 2020,
                image: "img/buku1.jpg"
            },
            {
                title: "Dasar-Dasar Pemrograman dengan .NET",
                author: "Ade Rahmat Iskandar",
                publisher: "Informatika",
                year: 2019,
                image: "img/buku2.jpg"
            },
            {
                title: "Metodologi Pengembangan Sistem Informasi",
                author: "Samiaji Sarosa",
                publisher: "Indeks",
                year: 2017,
                image: "img/buku3.jpg"
            },
            {
                title: "Struktur Data",
                author: "Rosa A.S",
                publisher: "Modula",
                year: 2018,
                image: "img/buku4.png"
            },
            {
                title: "Dasar Pemrograman Python 3",
                author: "Abdul Kadir",
                publisher: "Andi Publisher",
                year: 2018,
                image: "img/buku5.jpg"
            },
            {
                title: "Sistem Basis Data Dan SQL",
                author: "Didik Setiyadi",
                publisher: "Mitra Wacana Media",
                year: 2020,
                image: "img/buku6.jpeg"
            },
            {
                title: "Perancangan Basis Data Teori",
                author: "Suhartini",
                publisher: "Deepublish",
                year: 2020,
                image: "img/buku7.jpg"
            },
            {
                title: "Teori Dan Praktek Sistem Operasi",
                author: "Zaid Romegar Mair",
                publisher: "Deepublish",
                year: 2018,
                image: "img/buku8.jpg"
            }
        ];
    }

    render(data) {

        const container =
            document.getElementById("bookContainer");

        container.innerHTML = "";

        if (data.length === 0) {

            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger text-center">
                        Buku tidak ditemukan
                    </div>
                </div>
            `;
            return;
        }

        data.forEach(book => {

            container.innerHTML += `
                <div class="col-md-3 mb-4">

                    <div class="card h-100 shadow-sm">

                        <img
                            src="${book.image}"
                            class="card-img-top book-cover"
                            alt="${book.title}"
                        >

                        <div class="card-body">

                            <h5 class="card-title">
                                ${book.title}
                            </h5>

                            <p class="card-text">
                                <strong>Author :</strong><br>
                                ${book.author}
                            </p>

                            <p class="card-text">
                                <strong>Publisher :</strong><br>
                                ${book.publisher}
                            </p>

                            <p class="card-text">
                                <strong>Year :</strong>
                                ${book.year}
                            </p>

                        </div>

                    </div>

                </div>
            `;
        });
    }

    filterBooks() {

        const keyword =
            document
            .getElementById("keyword")
            .value
            .toLowerCase()
            .trim();

        const year =
            document
            .getElementById("yearInput")
            .value;

        const filterType =
            document
            .querySelector(
                "input[name='filter']:checked"
            ).value;

        let result = [];

        switch (filterType) {

            case "title":

                result = this.books.filter(book =>
                    book.title
                    .toLowerCase()
                    .includes(keyword)
                );

                break;

            case "author":

                result = this.books.filter(book =>
                    book.author
                    .toLowerCase()
                    .includes(keyword)
                );

                break;

            case "publisher":

                result = this.books.filter(book =>
                    book.publisher
                    .toLowerCase()
                    .includes(keyword)
                );

                break;

            case "titleYear":

                result = this.books.filter(book => {

                    const matchTitle =
                        book.title
                        .toLowerCase()
                        .includes(keyword);

                    const matchYear =
                        year === ""
                        ? true
                        : book.year == year;

                    return matchTitle && matchYear;
                });

                break;
        }

        this.render(result);
    }

    initializeEvents() {

        document
            .getElementById("keyword")
            .addEventListener("keyup", () => {
                this.filterBooks();
            });

        document
            .getElementById("yearInput")
            .addEventListener("keyup", () => {
                this.filterBooks();
            });

        const radios =
            document.querySelectorAll(
                "input[name='filter']"
            );

        radios.forEach(radio => {

            radio.addEventListener("change", () => {

                const yearInput =
                    document.getElementById(
                        "yearInput"
                    );

                if (radio.value === "titleYear") {

                    yearInput.disabled = false;

                } else {

                    yearInput.disabled = true;
                    yearInput.value = "";
                }

                this.filterBooks();
            });
        });

        document
            .getElementById("yearInput")
            .disabled = true;
    }

    start() {

        this.render(this.books);

        this.initializeEvents();
    }
}

const app = new SearchBook();

app.start();