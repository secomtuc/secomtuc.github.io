// Dados de eventos por ano e mês
const eventsData = {
  2025: {
    9: [
      {
        title: "Desfile 7 de Setembro",
        date: "07 Set",
        desc: "Desfile cívico do 7 de setembro. Senha de Acesso: 1234",
        alt: "Desfile cívico com pessoas marchando",
        link: "https://1024terabox.com/s/1mcQkofbeu55SwfUaNCMAzQ",
      },
    ]
  },
};

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const monthsContainer = document.getElementById("months");
const modalBackdrop = document.getElementById("modal-backdrop");
const eventCardsContainer = document.getElementById("event-cards");
const selectedMonthSpan = document.getElementById("selected-month");
const selectedYearSpan = document.getElementById("selected-year");
const yearSelect = document.getElementById("year-select");
const closeEventsBtn = document.getElementById("close-events");

function generateMonthCards() {
  monthsContainer.innerHTML = "";
  const selectedYear = parseInt(yearSelect.value);
  const yearEvents = eventsData[selectedYear] || {};

  for (let i = 0; i < 12; i++) {
    const monthNumber = i + 1;
    // Verifica se o mês tem eventos no ano selecionado
    if (yearEvents[monthNumber] && yearEvents[monthNumber].length > 0) {
      const monthCard = document.createElement("div");
      monthCard.className =
        "month-card bg-[#C1D523] rounded-lg shadow-md p-6 cursor-pointer";
      monthCard.setAttribute("data-month", monthNumber);
      monthCard.setAttribute("tabindex", "0");
      monthCard.setAttribute("role", "button");
      monthCard.setAttribute("aria-pressed", "false");
      monthCard.innerHTML = `
            <img src="https://placehold.co/300x200/transparent/white?text=${monthNames[i]}" alt="Imagem representando o mês de ${monthNames[i]}" class="w-full h-32 object-cover rounded-md mb-4" />
            <p class="text-center text-white mt-2">Clique para ver eventos</p>
          `;
      monthCard.addEventListener("click", () => {
        showEventsModal(selectedYear, monthNumber);
      });
      monthCard.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          showEventsModal(selectedYear, monthNumber);
        }
      });
      monthsContainer.appendChild(monthCard);
    }
  }

  // Se nenhum mês tem evento, mostrar mensagem
  if (monthsContainer.children.length === 0) {
    monthsContainer.innerHTML =
      '<p class="col-span-full text-center text-white text-lg">Nenhum evento disponível para o ano selecionado.</p>';
  }
}

function showEventsModal(year, month) {
  selectedMonthSpan.textContent = monthNames[month - 1];
  selectedYearSpan.textContent = year;

  eventCardsContainer.innerHTML = "";

  const events = (eventsData[year] && eventsData[year][month]) || [];

  if (events.length === 0) {
    eventCardsContainer.innerHTML =
      '<p class="col-span-full text-center text-gray-500">Nenhum evento neste mês.</p>';
  } else {
    events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className =
        "event-card bg-[#C1D523] rounded-lg shadow-md p-4 flex flex-col";
      eventCard.title = "Clique para abrir o link do evento";
      eventCard.innerHTML = `
            <h4 class="text-lg font-semibold text-white">${event.title}</h4>
            <p class="text-sm font-bold text-indigo-600 mt-1">${event.date}</p>
            <p class="text-white mt-2 flex-grow">${event.desc}</p>
          `;
      eventCard.addEventListener("click", () => {
        if (event.link) {
          window.open(event.link, "_blank", "noopener");
        } else {
          window.open(event.img, "_blank", "noopener");
        }
      });
      eventCardsContainer.appendChild(eventCard);
    });
  }

  modalBackdrop.style.display = "flex";
  closeEventsBtn.focus();
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalBackdrop.style.display = "none";
  document.body.style.overflow = "";
  yearSelect.focus();
}

closeEventsBtn.addEventListener("click", closeModal);

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalBackdrop.style.display === "flex") {
    closeModal();
  }
});

yearSelect.addEventListener("change", () => {
  closeModal();
  generateMonthCards();
});

// Inicializa exibindo meses do ano selecionado
generateMonthCards();
