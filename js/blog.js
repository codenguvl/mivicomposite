// Blog Pagination Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Pagination elements
  const paginationContainer = document.querySelector(".pagination-container");
  const paginationPages = document.querySelector(".pagination-pages");
  const prevBtn = document.querySelector(".pagination-prev");
  const nextBtn = document.querySelector(".pagination-next");
  const paginationInfo = document.querySelector(".pagination-info");

  // Pagination state
  let currentPage = 1;
  const itemsPerPage = 12;
  const totalItems = 96;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Initialize pagination
  initializePagination();

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", handlePrevPage);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", handleNextPage);
  }

  // Initialize pagination
  function initializePagination() {
    updatePaginationButtons();
    updatePaginationInfo();
    renderPaginationPages();
  }

  // Handle previous page
  function handlePrevPage() {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  }

  // Handle next page
  function handleNextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  }

  // Handle page click
  function handlePageClick(pageNumber) {
    if (
      pageNumber !== currentPage &&
      pageNumber >= 1 &&
      pageNumber <= totalPages
    ) {
      currentPage = pageNumber;
      updatePagination();
    }
  }

  // Update pagination state
  function updatePagination() {
    updatePaginationButtons();
    updatePaginationInfo();
    renderPaginationPages();
    scrollToTop();

    // Here you would typically fetch new data for the current page
    // For now, we'll just log the page change
    console.log(`Navigated to page ${currentPage}`);
  }

  // Update pagination buttons state
  function updatePaginationButtons() {
    if (prevBtn) {
      prevBtn.disabled = currentPage === 1;
    }

    if (nextBtn) {
      nextBtn.disabled = currentPage === totalPages;
    }
  }

  // Update pagination info
  function updatePaginationInfo() {
    if (paginationInfo) {
      const startItem = (currentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(currentPage * itemsPerPage, totalItems);
      paginationInfo.innerHTML = `<span>Hiển thị ${startItem}-${endItem} của ${totalItems} bài viết</span>`;
    }
  }

  // Render pagination pages
  function renderPaginationPages() {
    if (!paginationPages) return;

    paginationPages.innerHTML = "";

    // Always show first page
    addPageButton(1);

    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis if there's a gap
    if (startPage > 2) {
      addEllipsis();
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      addPageButton(i);
    }

    // Add ellipsis if there's a gap
    if (endPage < totalPages - 1) {
      addEllipsis();
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      addPageButton(totalPages);
    }
  }

  // Add page button
  function addPageButton(pageNumber) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `pagination-page ${
      pageNumber === currentPage ? "active" : ""
    }`;
    pageBtn.textContent = pageNumber;
    pageBtn.setAttribute("aria-label", `Trang ${pageNumber}`);

    pageBtn.addEventListener("click", () => handlePageClick(pageNumber));
    paginationPages.appendChild(pageBtn);
  }

  // Add ellipsis
  function addEllipsis() {
    const ellipsis = document.createElement("span");
    ellipsis.className = "pagination-ellipsis";
    ellipsis.textContent = "...";
    paginationPages.appendChild(ellipsis);
  }

  // Scroll to top of page
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && currentPage > 1) {
      handlePrevPage();
    } else if (e.key === "ArrowRight" && currentPage < totalPages) {
      handleNextPage();
    }
  });

  // Add touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentPage < totalPages) {
        // Swipe left - next page
        handleNextPage();
      } else if (diff < 0 && currentPage > 1) {
        // Swipe right - previous page
        handlePrevPage();
      }
    }
  }
});

// Add loading state for pagination
function showPaginationLoading() {
  const paginationContainer = document.querySelector(".pagination-container");
  if (paginationContainer) {
    paginationContainer.style.opacity = "0.6";
    paginationContainer.style.pointerEvents = "none";
  }
}

function hidePaginationLoading() {
  const paginationContainer = document.querySelector(".pagination-container");
  if (paginationContainer) {
    paginationContainer.style.opacity = "1";
    paginationContainer.style.pointerEvents = "auto";
  }
}

// Export functions for external use
window.blogPagination = {
  showLoading: showPaginationLoading,
  hideLoading: hidePaginationLoading,
};
