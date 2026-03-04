const educationItems = document.querySelectorAll("#Education + p + br + ol li");
const educationArray = Array.from(educationItems).map(li => li.textContent.trim());
console.log("Array educatie:", educationArray);
const filter2024 = educationArray.filter(item => item.includes("2024"));
console.log("Contine 2024:", filter2024);
const filterUniversitate = educationArray.filter(item => item.includes("Universitatea"));
console.log("Contine Universitatea:", filterUniversitate);
const firstWords = educationArray.map(item => item.split(" ")[0]);
console.log("Primul cuvant:", firstWords);
const totalYears = educationArray.reduce((total, item) => {
  const years = item.match(/\d{4}/g);
  if (years && years.length >= 2) {
    const start = parseInt(years[0]);
    const end = parseInt(years[1]);
    return total + (end - start);
  }
  return total;
}, 0);
console.log(`Total ani de studiu: ${totalYears}`);

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) {
      throw new Error("Eroare la incarcarea JSON");
    }
    const projects = await response.json();
    const projectsSection = document.getElementById("projects");
    projectsSection.innerHTML += `<ul>${projects.map(project => `<li>${project.name} - ${project.tech} - ${project.done ? "Finalizat" : "In progres"}</li>`).join("")}</ul>`;
    const completed = projects.filter(p => p.done).length;
    projectsSection.innerHTML += `<p><strong>Finalizate: ${completed} din ${projects.length}</strong></p>`;
  } catch (error) {
    console.error("Eroare:", error);
  }
}
loadProjects();