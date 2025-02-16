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
    // 현재 환경이 로컬인지 GitHub Pages인지 확인
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    // GitHub Pages의 repository 이름을 기반으로 한 기본 경로 설정
    const basePath = isLocal ? "" : "/Portfolio"; // 여기를 본인의 repository 이름으로 변경하세요
    const response = await fetch(`${basePath}/components/${path}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
    document.getElementById(
      id
    ).innerHTML = `<p>Error loading content: ${error.message}</p>`;
  }
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

    // 프로젝트 토글 초기화
    const projectDetails = document.querySelectorAll(".project-details");
    projectDetails.forEach((detail) => {
      detail.classList.add("collapsed");
    });
  } catch (error) {
    console.error("Error loading components:", error);
  }
});
