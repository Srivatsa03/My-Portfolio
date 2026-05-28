var audio=document.getElementById("audioPlayer"),loader=document.getElementById("preloader");function settingtoggle(){document.getElementById("setting-container").classList.toggle("settingactivate"),document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow")}function playpause(){!1==document.getElementById("switchforsound").checked?audio.pause():audio.play()}window.addEventListener("load",function(){loader.style.display="none",document.querySelector(".hey").classList.add("popup")});let emptyArea=document.getElementById("emptyarea"),mobileTogglemenu=document.getElementById("mobiletogglemenu");function hamburgerMenu(){document.body.classList.toggle("stopscrolling"),document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu"),document.getElementById("burger-bar1").classList.toggle("hamburger-animation1"),document.getElementById("burger-bar2").classList.toggle("hamburger-animation2"),document.getElementById("burger-bar3").classList.toggle("hamburger-animation3")}function hidemenubyli(){document.body.classList.toggle("stopscrolling"),document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu"),document.getElementById("burger-bar1").classList.remove("hamburger-animation1"),document.getElementById("burger-bar2").classList.remove("hamburger-animation2"),document.getElementById("burger-bar3").classList.remove("hamburger-animation3")}const sections=document.querySelectorAll("section"),navLi=document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),mobilenavLi=document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");window.addEventListener("scroll",()=>{let e="";sections.forEach(t=>{let o=t.offsetTop;t.clientHeight,pageYOffset>=o-200&&(e=t.getAttribute("id"))}),mobilenavLi.forEach(t=>{t.classList.remove("activeThismobiletab"),t.classList.contains(e)&&t.classList.add("activeThismobiletab")}),navLi.forEach(t=>{t.classList.remove("activeThistab"),t.classList.contains(e)&&t.classList.add("activeThistab")})}),console.log("%c Designed and Developed by Srivatsa Kamballa ","background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;");let mybutton=document.getElementById("backtotopbutton");function scrollFunction(){document.body.scrollTop>400||document.documentElement.scrollTop>400?mybutton.style.display="block":mybutton.style.display="none"}function scrolltoTopfunction(){document.body.scrollTop=0,document.documentElement.scrollTop=0}window.onscroll=function(){scrollFunction()},document.addEventListener("contextmenu",function(e){"IMG"===e.target.nodeName&&e.preventDefault()},!1);let Pupils=document.getElementsByClassName("footer-pupil"),pupilsArr=Array.from(Pupils),pupilStartPoint=-10,pupilRangeX=20,pupilRangeY=15,mouseXStartPoint=0,mouseXEndPoint=window.innerWidth,currentXPosition=0,fracXValue=0,mouseYEndPoint=window.innerHeight,currentYPosition=0,fracYValue=0,mouseXRange=mouseXEndPoint-mouseXStartPoint;const mouseMove=e=>{fracXValue=(currentXPosition=e.clientX-mouseXStartPoint)/mouseXRange,fracYValue=(currentYPosition=e.clientY)/mouseYEndPoint;let t=pupilStartPoint+fracXValue*pupilRangeX,o=pupilStartPoint+fracYValue*pupilRangeY;pupilsArr.forEach(e=>{e.style.transform=`translate(${t}px, ${o}px)`})},windowResize=e=>{mouseXEndPoint=window.innerWidth,mouseYEndPoint=window.innerHeight,mouseXRange=mouseXEndPoint-mouseXStartPoint};window.addEventListener("mousemove",mouseMove),window.addEventListener("resize",windowResize);

const typingRoleElement = document.getElementById("typing-role");
const typingRoles = [
  "Software Engineer",
  "AI Engineer",
  "AI Infrastructure Engineer",
  "Platform Engineer",
  "Cloud Engineer",
  "DevOps Engineer",
  "Backend Engineer",
  "Data Infrastructure Engineer"
];

if (typingRoleElement) {
  let roleIndex = 0;
  let characterIndex = typingRoles[roleIndex].length;
  let isDeleting = true;
  const typeDelay = 70;
  const deleteDelay = 42;
  const holdDelay = 1300;

  const typeNextRole = () => {
    const currentRole = typingRoles[roleIndex];
    typingRoleElement.textContent = currentRole.slice(0, characterIndex);

    if (!isDeleting && characterIndex === currentRole.length) {
      window.setTimeout(() => {
        isDeleting = true;
        typeNextRole();
      }, holdDelay);
      return;
    }

    if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % typingRoles.length;
    }

    characterIndex += isDeleting ? -1 : 1;
    window.setTimeout(typeNextRole, isDeleting ? deleteDelay : typeDelay);
  };

  window.setTimeout(typeNextRole, holdDelay);
}

(function initHeroSystemMap() {
  const canvas = document.getElementById("hero-system-map");
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const orbitNodes = [
    { label: "AI", ring: 0, angle: -0.2, speed: 0.00023, color: "rgba(214, 230, 243, 0.9)" },
    { label: "Cloud", ring: 0, angle: 2.2, speed: 0.00023, color: "rgba(77, 208, 225, 0.85)" },
    { label: "Backend", ring: 1, angle: 0.8, speed: -0.00018, color: "rgba(214, 230, 243, 0.72)" },
    { label: "Data", ring: 1, angle: 3.7, speed: -0.00018, color: "rgba(77, 208, 225, 0.72)" },
    { label: "SRE", ring: 2, angle: 1.7, speed: 0.00013, color: "rgba(214, 230, 243, 0.62)" },
    { label: "RAG", ring: 2, angle: 4.8, speed: 0.00013, color: "rgba(77, 208, 225, 0.62)" }
  ];

  const resizeCanvas = () => {
    const width = canvas.clientWidth || canvas.parentElement.clientWidth;
    const height = canvas.clientHeight || canvas.parentElement.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const drawEllipse = (centerX, centerY, radiusX, radiusY, rotation, opacity) => {
    context.save();
    context.translate(centerX, centerY);
    context.rotate(rotation);
    context.beginPath();
    context.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
    context.strokeStyle = `rgba(77, 208, 225, ${opacity})`;
    context.lineWidth = 1;
    context.stroke();
    context.restore();
  };

  const drawNode = (x, y, size, color, glow) => {
    const gradient = context.createRadialGradient(x, y, 0, x, y, size * 4);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.28, color);
    gradient.addColorStop(1, "rgba(77, 208, 225, 0)");

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, size * 4, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = glow ? "rgba(245, 247, 250, 0.92)" : color;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
  };

  const drawHeroMap = (time) => {
    const width = canvas.clientWidth || canvas.parentElement.clientWidth;
    const height = canvas.clientHeight || canvas.parentElement.clientHeight;
    const isMobile = width < 800;
    const scrollProgress = document.documentElement.scrollHeight > window.innerHeight
      ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      : 0;
    const driftX = Math.sin(time * 0.00016 + scrollProgress * Math.PI * 2) * width * (isMobile ? 0.08 : 0.11);
    const driftY = Math.cos(time * 0.00012 + scrollProgress * Math.PI * 2) * height * (isMobile ? 0.05 : 0.08);
    const centerX = width * (isMobile ? 0.72 : 0.76) + driftX;
    const centerY = height * (isMobile ? 0.64 : 0.5) + driftY;
    const base = Math.min(width, height) * (isMobile ? 0.18 : 0.24);

    context.clearRect(0, 0, width, height);

    const aura = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, base * 2.2);
    aura.addColorStop(0, "rgba(77, 208, 225, 0.1)");
    aura.addColorStop(0.55, "rgba(15, 82, 186, 0.06)");
    aura.addColorStop(1, "rgba(15, 82, 186, 0)");
    context.fillStyle = aura;
    context.beginPath();
    context.arc(centerX, centerY, base * 2.2, 0, Math.PI * 2);
    context.fill();

    const rings = [
      { rx: base * 0.78, ry: base * 0.28, rotation: -0.34, opacity: isMobile ? 0.1 : 0.16 },
      { rx: base * 1.08, ry: base * 0.39, rotation: 0.18, opacity: isMobile ? 0.08 : 0.12 },
      { rx: base * 1.38, ry: base * 0.5, rotation: -0.1, opacity: isMobile ? 0.06 : 0.09 }
    ];

    rings.forEach((ring) => drawEllipse(centerX, centerY, ring.rx, ring.ry, ring.rotation, ring.opacity));

    drawNode(centerX, centerY, isMobile ? 4 : 6, "rgba(245, 247, 250, 0.9)", true);

    orbitNodes.forEach((node, index) => {
      const ring = rings[node.ring];
      const angle = node.angle + time * node.speed;
      const pulse = 1 + Math.sin(time * 0.002 + index) * 0.12;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const rotatedX = cos * ring.rx;
      const rotatedY = sin * ring.ry;
      const x = centerX + rotatedX * Math.cos(ring.rotation) - rotatedY * Math.sin(ring.rotation);
      const y = centerY + rotatedX * Math.sin(ring.rotation) + rotatedY * Math.cos(ring.rotation);

      drawNode(x, y, (isMobile ? 2.8 : 3.8) * pulse, node.color, false);

      if (!isMobile && node.ring === 0) {
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(x, y);
        context.strokeStyle = "rgba(77, 208, 225, 0.08)";
        context.lineWidth = 1;
        context.stroke();
      }
    });

    window.requestAnimationFrame(drawHeroMap);
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  window.requestAnimationFrame(drawHeroMap);
})();
