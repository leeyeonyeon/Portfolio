$(document).ready(function() {
  // FullPage 설정
  $('#fullpage').fullpage({
    anchors: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7'],
    navigation: true,
    navigationPosition: 'right',
    scrollOverflow: true,

    afterLoad: function(anchorLink, index) {
      if (index >= 4) {
        $('header').fadeIn(300);  // 섹션 4 이상에서는 헤더 보이게
      } else {
        $('header').fadeOut(300);  // 섹션 1~3에서는 헤더 숨기기
      }

      $('header ul li a').removeClass('active');

      if (index >= 4) {
        var sectionId = 'section' + index;
        $('header ul li[data-menuanchor="'+sectionId+'"] a').addClass('active');
      }
    },

    onLeave: function(index, nextIndex, direction) {
      if (nextIndex >= 4) {
        $('header').fadeIn(300);
      } else {
        $('header').fadeOut(300);
      }
    }
  });

  // 헤더 항목 클릭 시 해당 섹션으로 이동
  $('header ul li a').on('click', function(e) {
    var sectionAnchor = $(this).attr('href').substring(1);
    $.fn.fullpage.moveTo(sectionAnchor);

    $('header ul li a').removeClass('active');
    $(this).addClass('active');

    e.preventDefault();
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

  // web design page-1, page-2
  let currentPage = 1;
  const totalPages = 2;

  function changePage(direction) {
    if (direction === 'next') {
      if (currentPage < totalPages) {
        currentPage++;
      }
    } else if (direction === 'prev') {
      if (currentPage > 1) {
        currentPage--;
      }
    }

    updatePageVisibility();
  }

  function updatePageVisibility() {
    // tab1과 tab2 모두에서 page-1은 항상 보이도록 설정
    const pages = $('.tab_content');
    pages.not('#tab1').find('.contents_list').hide(); 
    $('#tab1').find('.contents_list').show();

    const currentPageElement = $('#tab2').find('.contents_list.page-' + currentPage);
    currentPageElement.show();

    const prevButton = $('.tab2-btn.prev');
    const nextButton = $('.tab2-btn.next');

    prevButton.prop('disabled', currentPage === 1);
    nextButton.prop('disabled', currentPage === totalPages);
  }

  updatePageVisibility();

  // 버튼 클릭 이벤트 핸들링
  $('.tab2-btn.next').click(function() {
    changePage('next');
  });

  $('.tab2-btn.prev').click(function() {
    changePage('prev');
  });

  /* --- 모달창 --- */
  // 각 목록을 클릭했을 때
  $(".card").click(function() {
    itemIdx = $(this).index(); // 클릭한 카드의 인덱스를 가져옴

    // 페이지 번호 업데이트
    $(".g_page span:nth-child(1)").text(itemIdx + 1);

    // 스크롤 숨기기
    $("html, body").css({"overflow": "hidden"});

    // 현재 탭이 UX · UI 디자인일 경우 modal1 열기
    if ($('.tab_link.active').data('tab') === 'tab1') {
      $(".modal1 .modal-content>li").eq(itemIdx).fadeIn();  // modal1의 해당 콘텐츠만 표시
      openModal('modal1');  // modal1을 여는 함수 호출
    }

    // 현재 탭이 Graphic Design일 경우 modal2 열기
    else if ($('.tab_link.active').data('tab') === 'tab2') {
      $(".modal2 .modal-content>li").eq(itemIdx).fadeIn();  // modal2의 해당 콘텐츠만 표시
      openModal('modal2');  // modal2을 여는 함수 호출
    }
  });

  // 이전 버튼 클릭 시 (모든 모달 공통 처리)
  $(".pre").click(function() {
    if (itemIdx > 0) {
      const modalSelector = $('.tab_link.active').data('tab') === 'tab1' ? '.modal1' : '.modal2';
      $(modalSelector + " .modal-content>li").eq(itemIdx).fadeOut(); // 현재 표시된 아이템 숨기기
      itemIdx--; // 인덱스 감소
      $(".g_page span:nth-child(1)").text(itemIdx + 1); // 페이지 번호 업데이트
      $(modalSelector + " .modal-content>li").eq(itemIdx).fadeIn(); // 새로운 아이템 표시
    }
  });

  // 다음 버튼 클릭 시 (모든 모달 공통 처리)
  $(".next").click(function() {
    const modalSelector = $('.tab_link.active').data('tab') === 'tab1' ? '.modal1' : '.modal2';
    
    if ($('.tab_link.active').data('tab') === 'tab1' && itemIdx < 6) {
      $(modalSelector + " .modal-content>li").eq(itemIdx).fadeOut(); // 현재 표시된 아이템 숨기기
      itemIdx++; // 인덱스 증가
      $(".g_page span:nth-child(1)").text(itemIdx + 1); // 페이지 번호 업데이트
      $(modalSelector + " .modal-content>li").eq(itemIdx).fadeIn(); // 새로운 아이템 표시
    } 
    else if ($('.tab_link.active').data('tab') === 'tab2' && itemIdx < 13) {
      $(modalSelector + " .modal-content>li").eq(itemIdx).fadeOut(); // 현재 표시된 아이템 숨기기
      itemIdx++; // 인덱스 증가
      $(".g_page span:nth-child(1)").text(itemIdx + 1); // 페이지 번호 업데이트
      $(modalSelector + " .modal-content>li").eq(itemIdx).fadeIn(); // 새로운 아이템 표시
    }
  });

  // 모달 닫기 버튼 클릭 시
  $(".close").click(function() {
    closeModal();
  });

  // 모달을 여는 함수
  function openModal(modalClass) {
    const modal = document.querySelector('.' + modalClass);
    modal.style.display = 'block';
    modal.style.zIndex = 9999;
    
    const header = document.querySelector('header');
    header.style.zIndex = 0;
    
    // 스크롤을 비활성화
    $("html, body").css({"overflow": "hidden"});

    // FullPage의 스크롤 비활성화
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);

    // 현재 활성화된 탭에 맞는 모달 버튼 보이기
    const tab = $('.tab_link.active').data('tab');
    if (tab === 'tab1') {
        $(".modal-btn1").css("display", "block");
        $(".modal-btn2").css("display", "none");
    } else if (tab === 'tab2') {
        $(".modal-btn2").css("display", "block");
        $(".modal-btn1").css("display", "none");
    }

    // 모달 열릴 때 modal-btn도 보이도록 처리
    $(".modal-btn").css("display", "block");

  }

  // 모달을 닫을 때
  function closeModal() {
    const modalClass = $('.tab_link.active').data('tab') === 'tab1' ? 'modal1' : 'modal2';
    const modal = document.querySelector('.' + modalClass);
    modal.style.display = 'none';
    
    const header = document.querySelector('header');
    header.style.zIndex = 10;
    
    // FullPage 스크롤 활성화
    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setKeyboardScrolling(true);
    
    // 모든 리스트 항목 숨기기
    $("." + modalClass + " .modal-content>li").stop().hide();

    // 모달 닫힐 때 modal-btn 숨기기
    $(".modal-btn1").css("display", "none");
    $(".modal-btn2").css("display", "none");
  }


  /* Web Publishing */
  $(document).ready(function() {
    // 처음에 #pub1만 보이도록 설정
    $(".pub-content li").hide();  // 모든 콘텐츠를 숨김
    $(".pub-content li.active").show();  // active인 #pub1만 보이게 설정
  
    $(".pub li").click(function() {
      let pubResult = $(this).attr("data-alt");  // 클릭한 탭에 해당하는 콘텐츠 가져오기
      
      // 탭에 'active' 클래스를 추가하고, 다른 탭에서 'active' 클래스를 제거
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
  
      // 모든 콘텐츠에서 'active' 클래스를 제거하고, 클릭한 탭에 맞는 콘텐츠에 'active' 클래스를 추가
      $(".pub-content li").removeClass("active").hide();  // 모든 콘텐츠를 숨기고 'active' 클래스 제거
      $("#" + pubResult).addClass("active").show();  // 클릭한 콘텐츠만 보이게 설정
    });
  });
});