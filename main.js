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

  const startFallbackMap = () => {
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const fallbackNodes = [
      [0, 0],
      [1, -0.8],
      [1.8, 0.1],
      [1.1, 0.95],
      [0, 1.05],
      [-1.1, 0.95],
      [-1.8, 0.1],
      [-1, -0.8]
    ];

    const resizeFallback = () => {
      const width = canvas.clientWidth || canvas.parentElement.clientWidth;
      const height = canvas.clientHeight || canvas.parentElement.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawFallback = (time) => {
      const width = canvas.clientWidth || canvas.parentElement.clientWidth;
      const height = canvas.clientHeight || canvas.parentElement.clientHeight;
      const centerX = width * (width < 800 ? 0.56 : 0.68);
      const centerY = height * (width < 800 ? 0.62 : 0.48);
      const scale = Math.min(width, height) * (width < 800 ? 0.18 : 0.23);

      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(77, 208, 225, 0.22)";
      context.fillStyle = "rgba(214, 230, 243, 0.85)";
      context.lineWidth = 1;

      const points = fallbackNodes.map(([x, y], index) => {
        const wave = Math.sin(time * 0.0015 + index) * 12;
        return [centerX + x * scale, centerY + y * scale + wave];
      });

      points.forEach(([x, y]) => {
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(x, y);
        context.stroke();
      });

      points.forEach(([x, y], index) => {
        const [nextX, nextY] = points[(index + 1) % points.length];
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(nextX, nextY);
        context.stroke();
      });

      context.beginPath();
      context.arc(centerX, centerY, 6, 0, Math.PI * 2);
      context.fill();

      points.forEach(([x, y], index) => {
        context.beginPath();
        context.arc(x, y, index % 3 === 0 ? 4.5 : 3.5, 0, Math.PI * 2);
        context.fill();
      });

      window.requestAnimationFrame(drawFallback);
    };

    window.addEventListener("resize", resizeFallback);
    resizeFallback();
    window.requestAnimationFrame(drawFallback);
  };

  if (!window.THREE) {
    startFallbackMap();
    return;
  }

  const webglProbe = document.createElement("canvas");
  const hasWebGL = Boolean(webglProbe.getContext("webgl") || webglProbe.getContext("experimental-webgl"));
  if (!hasWebGL) {
    startFallbackMap();
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 8.5;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const group = new THREE.Group();
  scene.add(group);

  const nodeLabels = [
    "AI Infrastructure",
    "Backend",
    "Cloud",
    "DevOps/SRE",
    "Data",
    "RAG",
    "Security",
    "Automation"
  ];
  const nodePositions = [];
  const radius = 2.8;

  nodeLabels.forEach((label, index) => {
    const angle = (index / nodeLabels.length) * Math.PI * 2;
    const zOffset = index % 2 === 0 ? 0.75 : -0.75;
    const position = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * 1.55, zOffset);
    nodePositions.push(position);

    const nodeGeometry = new THREE.SphereGeometry(index === 0 ? 0.09 : 0.065, 18, 18);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: index % 3 === 0 ? 0x4dd0e1 : 0xd6e6f3,
      transparent: true,
      opacity: 0.88
    });
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.copy(position);
    node.userData.phase = index * 0.6;
    group.add(node);
  });

  const centerGeometry = new THREE.SphereGeometry(0.14, 24, 24);
  const centerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
  const centerNode = new THREE.Mesh(centerGeometry, centerMaterial);
  group.add(centerNode);

  const linePoints = [];
  nodePositions.forEach((position, index) => {
    linePoints.push(0, 0, 0, position.x, position.y, position.z);
    const nextPosition = nodePositions[(index + 1) % nodePositions.length];
    linePoints.push(position.x, position.y, position.z, nextPosition.x, nextPosition.y, nextPosition.z);
  });

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x4dd0e1,
    transparent: true,
    opacity: 0.22
  });
  group.add(new THREE.LineSegments(lineGeometry, lineMaterial));

  const resizeHeroMap = () => {
    const width = canvas.clientWidth || canvas.parentElement.clientWidth;
    const height = canvas.clientHeight || canvas.parentElement.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    group.position.x = width < 800 ? 0.3 : 1.7;
    group.scale.setScalar(width < 800 ? 0.86 : 1);
  };

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 0.18;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 0.12;
  });
  window.addEventListener("resize", resizeHeroMap);
  resizeHeroMap();

  const clock = new THREE.Clock();
  const animateHeroMap = () => {
    const elapsed = clock.getElapsedTime();
    group.rotation.y = elapsed * 0.12 + mouseX;
    group.rotation.x = Math.sin(elapsed * 0.3) * 0.08 + mouseY;

    group.children.forEach((child) => {
      if (child.isMesh && child.userData.phase !== undefined) {
        const pulse = 1 + Math.sin(elapsed * 1.8 + child.userData.phase) * 0.18;
        child.scale.setScalar(pulse);
      }
    });

    renderer.render(scene, camera);
  };

  renderer.setAnimationLoop(animateHeroMap);
})();
