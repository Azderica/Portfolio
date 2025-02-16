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

// 컴포넌트 로딩 함수
async function loadComponent(id, path) {
  try {
    const response = await fetch(`components/${path}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
  }
}

// 페이지 로드 시 모든 컴포넌트 로딩
document.addEventListener("DOMContentLoaded", async function () {
  await Promise.all([
    loadComponent("introduction", "introduction.html"),
    loadComponent("experience", "experience.html"),
    loadComponent("education", "education.html"),
    loadComponent("skills", "skills.html"),
    loadComponent("awards", "awards.html"),
    loadComponent("language", "language.html"),
    loadComponent("links", "links.html"),
  ]);

  // 프로젝트 토글 초기화 (기존 코드)
  const projectDetails = document.querySelectorAll(".project-details");
  projectDetails.forEach((detail) => {
    detail.classList.add("collapsed");
  });
});
