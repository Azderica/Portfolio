function toggleProject(header) {
  const project = header.parentElement;
  const details = project.querySelector(".project-details");
  const allProjects = document.querySelectorAll(".project");

  // 다른 모든 프로젝트를 닫습니다
  allProjects.forEach((p) => {
    if (p !== project) {
      p.querySelector(".project-details").classList.add("collapsed");
      p.classList.remove("active");
    }
  });

  // 현재 프로젝트를 토글합니다
  details.classList.toggle("collapsed");
  project.classList.toggle("active");
}

// 페이지 로드 시 모든 프로젝트 상세 내용을 숨깁니다
document.addEventListener("DOMContentLoaded", function () {
  const projectDetails = document.querySelectorAll(".project-details");
  projectDetails.forEach((detail) => {
    detail.classList.add("collapsed");
  });
});

// 이미지 경로 설정 함수
function setProfileImagePath() {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const basePath = isLocal ? "" : "/Portfolio";

  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.src = `${basePath}/static/profile.jpg`;
  }
}

// 컴포넌트 로딩 함수
async function loadComponent(id, path) {
  try {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const basePath = isLocal ? "" : "/Portfolio";
    const response = await fetch(`${basePath}/components/${path}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    document.getElementById(id).innerHTML = html;

    // introduction 컴포넌트가 로드된 후 이미지 경로 설정
    if (id === "introduction") {
      setProfileImagePath();
    }

    // experience 컴포넌트가 로드된 후 토글 이벤트 초기화
    if (id === "experience") {
      initializeProjectToggles();
    }
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
    document.getElementById(
      id
    ).innerHTML = `<p>Error loading content: ${error.message}</p>`;
  }
}

// 프로젝트 토글 초기화 함수
function initializeProjectToggles() {
  const projectHeaders = document.querySelectorAll(".project-header");

  projectHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const project = this.closest(".project");
      const details = project.querySelector(".project-details");

      // 다른 모든 프로젝트를 닫습니다
      document.querySelectorAll(".project").forEach((p) => {
        if (p !== project) {
          const otherDetails = p.querySelector(".project-details");
          otherDetails.classList.add("collapsed");
          p.classList.remove("active");
        }
      });

      // 현재 프로젝트를 토글합니다
      if (details.classList.contains("collapsed")) {
        details.classList.remove("collapsed");
        project.classList.add("active");
      } else {
        details.classList.add("collapsed");
        project.classList.remove("active");
      }
    });
  });

  // 초기 상태: 모든 프로젝트를 닫힌 상태로 설정
  document.querySelectorAll(".project-details").forEach((detail) => {
    detail.classList.add("collapsed");
  });
  document.querySelectorAll(".project").forEach((project) => {
    project.classList.remove("active");
  });
}

// 페이지 로드 시 모든 컴포넌트 로딩
document.addEventListener("DOMContentLoaded", async function () {
  try {
    await Promise.all([
      loadComponent("introduction", "introduction.html"),
      loadComponent("experience", "experience.html"),
      loadComponent("education", "education.html"),
      loadComponent("skills", "skills.html"),
      loadComponent("awards", "awards.html"),
      loadComponent("language", "language.html"),
      loadComponent("links", "links.html"),
    ]);
  } catch (error) {
    console.error("Error loading components:", error);
  }
});
