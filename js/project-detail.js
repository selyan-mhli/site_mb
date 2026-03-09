// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileNav = document.getElementById("mobileNav")

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active")
    mobileNav.classList.toggle("active")
  })
}

// Image Gallery (derive data from DOM instead of hardcoded arrays)
const thumbnailItems = document.querySelectorAll(".image-thumbnails li")

/**
 * Change the main image when clicking on a thumbnail
 * @param {number} index - Index of the image to display
 * @param {HTMLElement} element - The thumbnail element clicked
 */
function changeImage(index, element) {
  const mainImage = document.getElementById("mainImage")
  if (!mainImage || !element) return

  const img = element.querySelector("img")
  if (!img) return

  // Update main image from clicked thumbnail
  mainImage.src = img.getAttribute("src")
  mainImage.alt = img.getAttribute("alt") || ""

  // Update active state on thumbnails
  document.querySelectorAll(".image-thumbnails li").forEach((li) => {
    li.classList.remove("active")
  })
  element.classList.add("active")
}

// Lightbox functionality
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightboxImg")

/**
 * Open the lightbox with the specified image
 * @param {number} index - Index of the image to display in lightbox
 */
function openLightbox(index) {
  if (!(lightbox && lightboxImg)) return

  // Prefer current main image; if index provided and valid, use that thumbnail instead
  const mainImage = document.getElementById("mainImage")

  let src = mainImage ? mainImage.getAttribute("src") : ""
  let alt = mainImage ? mainImage.getAttribute("alt") : ""

  if (typeof index === "number" && thumbnailItems && thumbnailItems[index]) {
    const thumbImg = thumbnailItems[index].querySelector("img")
    if (thumbImg) {
      src = thumbImg.getAttribute("src") || src
      alt = thumbImg.getAttribute("alt") || alt
    }
  }

  if (src) {
    lightboxImg.src = src
    lightboxImg.alt = alt
    lightbox.showModal()
  }
}

// Sync initial active thumbnail with main image on load
window.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage")
  const thumbs = document.querySelectorAll(".image-thumbnails li")
  if (!mainImage || !thumbs.length) return

  // Reset all actives first
  thumbs.forEach((li) => li.classList.remove("active"))

  // Activate the thumbnail that matches the current main image
  let matched = false
  thumbs.forEach((li) => {
    const img = li.querySelector("img")
    if (img && img.getAttribute("src") === mainImage.getAttribute("src")) {
      li.classList.add("active")
      matched = true
    }
  })

  // If no thumbnail matches, default to first without changing the main image
  if (!matched && thumbs[0]) {
    thumbs[0].classList.add("active")
  }
})

/**
 * Close the lightbox
 */
function closeLightbox() {
  if (lightbox) {
    lightbox.close()
  }
}

// Close lightbox on backdrop click
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })
}

// Close lightbox on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && lightbox.open) {
    closeLightbox()
  }
})
