$(document).ready(function() {
  /* 탑버튼&오른쪽 퀵메뉴*/
  $(".top_btn").hide();  //탑버튼 숨기기

  $(window).scroll(function(){
    //스크롤위치 표시
    let scrPosition = $(this).scrollTop();
    $("#txt1").text(scrPosition);

    //스크롤이 300이상일때  TOP버튼,오른쪽 퀵메뉴 보이게 하고 스크롤을 올리면 다시 숨김
    if(scrPosition>=1100){
      $(".top_btn").fadeIn(); 
    }else{
      $(".top_btn").fadeOut(); 
    };
  });

  /* header */
  $(document).ready(function() {
  // 메뉴 클릭 시 섹션으로 이동
  $("header ul li a").click(function(event) {
    event.preventDefault(); // 기본 클릭 동작 방지
    let targetSection = $($(this).attr("href")); // href 값으로 타겟 섹션 찾기
    $('html, body').animate({
      scrollTop: targetSection.offset().top // 타겟 섹션으로 스크롤 이동
    }, 100);
  });

  // 스크롤 위치에 따라 메뉴 항목 활성화
  $(window).scroll(function() {
    console.log("Scroll event triggered");
    let scroll = $(this).scrollTop(); // 현재 스크롤 위치
    let sections = $("div[id^='section']"); // section1, section2, section3 등으로 시작하는 div 선택

    console.log("Total sections:", sections.length); // 섹션의 개수 확인

    let activeIndex = -1; // 활성화할 메뉴 항목의 인덱스 선언

    sections.each(function(index, section) {
      let sectionTop = $(section).offset().top; // 섹션의 상단 위치
      let sectionBottom = sectionTop + $(section).outerHeight(); // 섹션의 하단 위치
      console.log("Section", index, "Top:", sectionTop, "Bottom:", sectionBottom, "Scroll:", scroll);

      // `#section4`부터 활성화하려면 `section4`가 보일 때부터 활성화
      if (scroll >= sectionTop - 100 && scroll < sectionBottom - 100 && index >= 3) {
        activeIndex = index - 3; // `#section4`는 첫 번째 메뉴 항목으로 활성화되도록 조정
      }
    });

    // active 클래스 추가
    $("header ul li a").removeClass("active");
    if (activeIndex !== -1) {
      $("header ul li a").eq(activeIndex).addClass("active");
    }

    // 헤더가 보이지 않게 되는 조건을 수정
    if (scroll >= 2700 && scroll < 8000) {
      $("header").addClass("show");
    } else {
      $("header").removeClass("show");
    }
  });
});

  /* info */
// 애니메이션을 적용할 요소
const infoTitle = document.querySelector('.info_title');

// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', () => {
  if (window.scrollY >= 500) { // 스크롤 위치가 3700px 이상일 때
    infoTitle.classList.add('animate');
  }
});

// 애니메이션을 적용할 요소
const infoCenter = document.querySelector('.info_center');

// 스크롤 이벤트 리스너 추가
window.addEventListener('scroll', () => {
  if (window.scrollY >= 500) { // 스크롤 위치가 3700px 이상일 때
    infoCenter.classList.add('animate');
  }
});



  // Tab menu 활성화
  $(".tab_menu li[data-tab='tab1']").addClass("active");
  $("#tab1").addClass("active");

  $(".tab_menu li").click(function() {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    let targetTab = $(this).attr("data-tab");
    $(".tab_contents .tab_content").removeClass("active");
    $("#" + targetTab).addClass("active");
  });


  /* -----------모달창----------- */

// modal-1 (UI/UX Design 모달)
let itemIdxModal1 = 0;

// 페이지 번호 표시
const maxIdx1 = $(".modal-1 .modal-content>li").length;  // 총 아이템 개수 (7개)
$(".modal-btn1 .g_page span:nth-child(2)").text(maxIdx1);  // 총 페이지 수 표시

// 모달 열기
$(".page-1>li").click(function() {
  itemIdxModal1 = $(this).index(); 

  $(".modal-btn1 .g_page span:nth-child(1)").text(itemIdxModal1 + 1); 
  $("html").css({"overflow-y": "hidden"}); 
  $(".modal-content>li").stop().fadeOut(); 
  $(".modal-content>li").eq(itemIdxModal1).stop().fadeIn(); 
  $(".modal-1").stop().fadeIn(); 
  $(".modal-btn1").css("display", "block"); 
  $('.modal-1').scrollTop(0);
});

// 이전 버튼 클릭
$(".modal-btn1 .pre").click(function() {
  if (itemIdxModal1 > 0) { 
    $(".modal-content>li").eq(itemIdxModal1).fadeOut(); 
    itemIdxModal1--; 
    $(".modal-btn1 .g_page span:nth-child(1)").text(itemIdxModal1 + 1); 
    $(".modal-content>li").eq(itemIdxModal1).stop().fadeIn();
    $('.modal-1').scrollTop(0);
  }
});

// 다음 버튼 클릭
$(".modal-btn1 .next").click(function() {
  if (itemIdxModal1 < maxIdx1 - 1) {  
    $(".modal-content>li").eq(itemIdxModal1).fadeOut(); 
    itemIdxModal1++;  
    $(".modal-btn1 .g_page span:nth-child(1)").text(itemIdxModal1 + 1);
    $(".modal-content>li").eq(itemIdxModal1).stop().fadeIn();
    $('.modal-1').scrollTop(0);
  }
});

// modal-2 (graphic design 모달)
let itemIdxModal2 = 0; 

// 페이지 번호 표시
const maxIdx2 = $(".modal-2 .modal-content2>li").length;  // 총 아이템 개수 (14개)
$(".modal-btn2 .g_page span:nth-child(2)").text(maxIdx2);  // 총 페이지 수 표시

// 모달 열기
$(".page-2>li").click(function() {
  itemIdxModal2 = $(this).index(); 

  $(".modal-btn2 .g_page span:nth-child(1)").text(itemIdxModal2 + 1);
  $("html").css({"overflow-y": "hidden"}); 
  $(".modal-content2>li").stop().fadeOut(); 
  $(".modal-content2>li").eq(itemIdxModal2).stop().fadeIn(); 
  $(".modal-2").stop().fadeIn(); 
  $(".modal-btn2").css("display", "block");
  $('.modal-2').scrollTop(0);
});

// 이전 버튼 클릭
$(".modal-btn2 .pre").click(function() {
  if (itemIdxModal2 > 0) {  
    $(".modal-content2>li").eq(itemIdxModal2).fadeOut(); 
    itemIdxModal2--;  
    $(".modal-btn2 .g_page span:nth-child(1)").text(itemIdxModal2 + 1);
    $(".modal-content2>li").eq(itemIdxModal2).stop().fadeIn(); 
    $('.modal-2').scrollTop(0);
  }
});

// 다음 버튼 클릭
$(".modal-btn2 .next").click(function() {
  if (itemIdxModal2 < maxIdx2 - 1) { 
    $(".modal-content2>li").eq(itemIdxModal2).fadeOut(); 
    itemIdxModal2++;  
    $(".modal-btn2 .g_page span:nth-child(1)").text(itemIdxModal2 + 1); 
    $(".modal-content2>li").eq(itemIdxModal2).stop().fadeIn();  
    $('.modal-2').scrollTop(0);
  }
});


// 닫기 버튼 (공통)
$(".close").click(function() {
  $("html").css({"overflow-y": "scroll"}); 
  $(".modal-1, .modal-2").stop().fadeOut();
  $(".modal-content>li, .modal-content2>li").stop().hide();
  $(".modal-btn1").css("display", "none"); // modal-btn1 숨기기
  $(".modal-btn2").css("display", "none"); // modal-btn2 숨기기
});

// 모달 외부 클릭시 닫기
$(document).mouseup(function (e) {
  var ModalClose = $(".modal-1, .modal-2");
  if (ModalClose.has(e.target).length == 0) {
    ModalClose.fadeOut(400); 
    $(".modal-content>li, .modal-content2>li").stop().fadeOut();
    $("html").css({"overflow-y": "scroll"});
    $(".modal-btn1").css("display", "none"); // modal-btn1 숨기기
    $(".modal-btn2").css("display", "none"); // modal-btn2 숨기기
  }
});

// 모달을 닫을 때 상태 초기화 (modal-btn1, modal-btn2)
function closeModal() {
  modal.style.display = 'none';

  // 헤더 z-index 복구
  const header = document.querySelector('header');
  header.style.zIndex = 10;

  // 모든 리스트 항목 숨기기
  $(".modal-1 .modal-content>li").stop().hide();
  $(".modal-2 .modal-content2>li").stop().hide();
}



  /* Web Publishing */
  $(".pub-content li").hide();
  $(".pub-content li.active").show();

  $(".pub li").click(function() {
    let pubResult = $(this).attr("data-alt");
    $(this).addClass("active").siblings().removeClass("active");
    $(".pub-content li").removeClass("active").hide();
    $("#" + pubResult).addClass("active").show();
  });

  /* web Planning */

  $(document).ready(function(){

    $(".title").click(function(){
      $(this).siblings(".title").removeClass("active");
      $(this).toggleClass("active");
      $(this).siblings(".content").stop().slideUp();
      $(this).next().stop().slideToggle();
    });
  
  });







});


