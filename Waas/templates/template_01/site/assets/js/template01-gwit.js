(function(){
  var preloaderRoot=document.getElementById('loader-wrapper');
  if(preloaderRoot){
    var preloaderBody=document.body;
    var preloaderHidden=false;
    var preloaderFallback=null;

    var hidePreloader=function(){
      if(preloaderHidden) return;
      preloaderHidden=true;
      preloaderRoot.classList.add('is-hidden');
      if(preloaderBody){
        preloaderBody.classList.remove('preloader-active');
      }
      window.setTimeout(function(){
        preloaderRoot.setAttribute('aria-hidden','true');
      },480);
      if(preloaderFallback){
        clearTimeout(preloaderFallback);
        preloaderFallback=null;
      }
    };

    if(preloaderBody){
      preloaderBody.classList.add('preloader-active');
    }
    preloaderRoot.classList.remove('is-hidden');
    preloaderRoot.setAttribute('aria-hidden','false');

    if(document.readyState==='complete'){
      window.setTimeout(hidePreloader,120);
    }else{
      window.addEventListener('load',function(){
        window.setTimeout(hidePreloader,120);
      },{once:true});
    }
    preloaderFallback=window.setTimeout(hidePreloader,2800);
  }

  function wire(selector){
    var form=document.querySelector(selector);
    if(!form) return;
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=form.querySelector('button[type="submit"]');
      if(!btn) return;
      var old=btn.textContent;
      btn.disabled=true;
      btn.textContent='Envoyé';
      setTimeout(function(){btn.disabled=false;btn.textContent=old;},1400);
    });
  }
  ['#form-pro','#c-form','#careerForm','.lead-form','#briefingForm'].forEach(wire);

  var heroRoot=document.querySelector('[data-hero-premium]');
  if(heroRoot){
    var heroSlides=heroRoot.querySelectorAll('[data-hero-slide]');
    var heroDots=heroRoot.querySelectorAll('[data-hero-dot]');
    var heroPrev=heroRoot.querySelector('[data-hero-prev]');
    var heroNext=heroRoot.querySelector('[data-hero-next]');
    var heroIndex=0;
    var heroTimer=null;
    var heroDelay=5600;
    var heroTransitionDelay=1020;
    var heroCleanupTimer=null;
    var prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var clearHeroTransientClasses=function(slide){
      slide.classList.remove('is-next','is-prev','is-entering','is-leaving');
    };

    var getHeroDirection=function(fromIndex,toIndex,total){
      var forward=(toIndex-fromIndex+total)%total;
      var backward=(fromIndex-toIndex+total)%total;
      if(forward===0) return 'next';
      return forward<=backward ? 'next' : 'prev';
    };

    var setHeroSlide=function(index,options){
      if(!heroSlides.length) return;
      var opts=options||{};
      var nextIndex=(index+heroSlides.length)%heroSlides.length;
      var previousIndex=heroIndex;

      if(heroCleanupTimer){
        clearTimeout(heroCleanupTimer);
        heroCleanupTimer=null;
      }

      heroSlides.forEach(clearHeroTransientClasses);

      if(opts.initial || previousIndex===nextIndex){
        heroIndex=nextIndex;
        heroSlides.forEach(function(slide,i){
          slide.classList.toggle('is-active',i===heroIndex);
        });
      }else{
        var direction=getHeroDirection(previousIndex,nextIndex,heroSlides.length);
        var leavingSlide=heroSlides[previousIndex];
        var enteringSlide=heroSlides[nextIndex];

        if(leavingSlide){
          leavingSlide.classList.remove('is-active');
          leavingSlide.classList.add('is-leaving',direction==='next'?'is-prev':'is-next');
        }
        if(enteringSlide){
          enteringSlide.classList.add('is-active','is-entering',direction==='next'?'is-next':'is-prev');
        }

        heroIndex=nextIndex;
        heroCleanupTimer=window.setTimeout(function(){
          heroSlides.forEach(clearHeroTransientClasses);
        },heroTransitionDelay);
      }

      heroDots.forEach(function(dot,i){
        var active=i===nextIndex;
        dot.classList.toggle('is-active',active);
        dot.setAttribute('aria-pressed',active?'true':'false');
      });
    };

    var startHeroAuto=function(){
      if(prefersReducedMotion || heroSlides.length<2) return;
      if(heroTimer) clearInterval(heroTimer);
      heroTimer=setInterval(function(){
        setHeroSlide(heroIndex+1);
      },heroDelay);
    };

    var stopHeroAuto=function(){
      if(heroTimer){
        clearInterval(heroTimer);
        heroTimer=null;
      }
    };

    if(heroPrev){
      heroPrev.addEventListener('click',function(){
        setHeroSlide(heroIndex-1);
        startHeroAuto();
      });
    }
    if(heroNext){
      heroNext.addEventListener('click',function(){
        setHeroSlide(heroIndex+1);
        startHeroAuto();
      });
    }
    heroDots.forEach(function(dot){
      dot.addEventListener('click',function(){
        var idx=parseInt(dot.getAttribute('data-hero-dot'),10);
        if(Number.isNaN(idx)) return;
        setHeroSlide(idx);
        startHeroAuto();
      });
    });

    heroRoot.addEventListener('mouseenter',stopHeroAuto);
    heroRoot.addEventListener('mouseleave',startHeroAuto);
    heroRoot.addEventListener('focusin',stopHeroAuto);
    heroRoot.addEventListener('focusout',startHeroAuto);

    setHeroSlide(0,{initial:true});
    startHeroAuto();
  }

  var premiumHeader=document.querySelector('.premium-header');
  if(premiumHeader){
    var syncHeaderOffset=function(){
      var headerHeight=Math.ceil(premiumHeader.getBoundingClientRect().height||premiumHeader.offsetHeight||92);
      document.documentElement.style.setProperty('--gwit-header-offset',headerHeight+'px');
    };
    window.addEventListener('resize',syncHeaderOffset);
    window.addEventListener('load',syncHeaderOffset);
    syncHeaderOffset();

    var navCollapse=premiumHeader.querySelector('.navbar-collapse');
    if(navCollapse){
      navCollapse.addEventListener('shown.bs.collapse',syncHeaderOffset);
      navCollapse.addEventListener('hidden.bs.collapse',syncHeaderOffset);
    }
  }

  var scrollTopButton=document.querySelector('.scroll-top');
  if(scrollTopButton){
    var toggleScrollTop=function(){
      var y=window.scrollY||document.documentElement.scrollTop||0;
      scrollTopButton.classList.toggle('is-visible',y>260);
    };
    window.addEventListener('scroll',toggleScrollTop,{passive:true});
    toggleScrollTop();
    scrollTopButton.addEventListener('click',function(){
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

  var caseStudySection=document.querySelector('.case-studies');
  if(caseStudySection){
    var filterButtons=caseStudySection.querySelectorAll('[data-case-filter]');
    var caseCards=caseStudySection.querySelectorAll('.case-study-card');

    var applyFilter=function(filter){
      var isAll=filter==='all';
      caseStudySection.classList.toggle('is-filtered',!isAll);

      filterButtons.forEach(function(btn){
        var isActive=btn.dataset.caseFilter===filter;
        btn.classList.toggle('active',isActive);
        btn.setAttribute('aria-pressed',isActive?'true':'false');
      });

      var featuredCards=Array.prototype.slice.call(caseCards).filter(function(card){
        return card.dataset.featured==='true';
      });

      caseCards.forEach(function(card,index){
        var categories=(card.dataset.category||'').split(' ').filter(Boolean);
        var matchesCategory=categories.indexOf(filter)!==-1;
        var isFeatured=card.dataset.featured==='true';
        var show=false;

        if(isAll){
          show=featuredCards.length?isFeatured:index<3;
        }else{
          show=matchesCategory;
        }
        card.classList.toggle('is-hidden',!show);
      });
    };

    filterButtons.forEach(function(btn){
      btn.addEventListener('click',function(){
        applyFilter(btn.dataset.caseFilter);
      });
    });

    var openLinks=caseStudySection.querySelectorAll('[data-case-open]');
    openLinks.forEach(function(link){
      link.addEventListener('click',function(event){
        var filter=link.dataset.caseOpen;
        if(!filter) return;
        event.preventDefault();
        applyFilter(filter);
        caseStudySection.scrollIntoView({behavior:'smooth',block:'start'});
      });
    });

    applyFilter('all');
  }

  (function initBlogFilters(){
    var filterButtons=document.querySelectorAll('.blog-filter-button');
    var blogCards=document.querySelectorAll('.blog-card');
    if(!filterButtons.length || !blogCards.length) return;

    var badgeButtons=document.querySelectorAll('.blog-badge');
    var searchInput=document.querySelector('[data-blog-search]');
    var sortButton=document.querySelector('[data-blog-sort]');
    var viewButtons=document.querySelectorAll('[data-blog-view]');
    var feedGrid=document.querySelector('.blog-feed-grid');
    var countValue=document.querySelector('[data-blog-count]');

    var cardItems=Array.prototype.slice.call(blogCards).map(function(card){
      var rawDate=card.dataset.date||'1970-01-01';
      var parsedDate=new Date(rawDate);
      if(Number.isNaN(parsedDate.getTime())) parsedDate=new Date('1970-01-01');
      return {
        el:card,
        categories:(card.dataset.categories||'').split(/\s+/).filter(Boolean),
        date:parsedDate,
        text:(card.textContent||'').toLowerCase()
      };
    });

    var activeFilter='all';
    var searchTerm='';
    var sortDesc=true;

    function updateCount(value){
      if(countValue) countValue.textContent=String(value);
    }

    function applyFilters(){
      var visibleCount=0;
      cardItems.forEach(function(item){
        var matchesFilter=activeFilter==='all' || item.categories.indexOf(activeFilter)!==-1;
        var matchesSearch=!searchTerm || item.text.indexOf(searchTerm)!==-1;
        var isVisible=matchesFilter && matchesSearch;
        item.el.classList.toggle('is-hidden',!isVisible);
        if(isVisible) visibleCount+=1;
      });
      filterButtons.forEach(function(btn){
        btn.classList.toggle('active',btn.dataset.filter===activeFilter);
      });
      updateCount(visibleCount);
    }

    function setFilter(key){
      activeFilter=key;
      applyFilters();
    }

    function sortByDate(){
      if(!feedGrid) return;
      var sorted=cardItems.slice().sort(function(a,b){
        return sortDesc ? (b.date-a.date) : (a.date-b.date);
      });
      sorted.forEach(function(item){
        feedGrid.appendChild(item.el);
      });
      if(sortButton){
        sortButton.textContent=sortDesc ? 'Trier par date (plus ancien d\'abord)' : 'Trier par date (plus récent d\'abord)';
      }
      sortDesc=!sortDesc;
    }

    filterButtons.forEach(function(btn){
      btn.addEventListener('click',function(){
        setFilter(btn.dataset.filter||'all');
      });
    });

    badgeButtons.forEach(function(btn){
      btn.addEventListener('click',function(){
        var target=btn.dataset.filterTarget;
        if(!target) return;
        var related=Array.prototype.slice.call(filterButtons).find(function(button){
          return button.dataset.filter===target;
        });
        if(related) related.click();
        else setFilter(target);
      });
    });

    if(searchInput){
      searchInput.addEventListener('input',function(){
        searchTerm=(searchInput.value||'').trim().toLowerCase();
        applyFilters();
      });
    }

    if(sortButton){
      sortButton.addEventListener('click',sortByDate);
    }

    if(viewButtons.length && feedGrid){
      viewButtons.forEach(function(btn){
        btn.addEventListener('click',function(){
          viewButtons.forEach(function(button){
            var isActive=button===btn;
            button.classList.toggle('is-active',isActive);
            button.setAttribute('aria-pressed',isActive?'true':'false');
          });
          feedGrid.dataset.blogView=btn.dataset.blogView||'grid';
        });
      });
    }

    applyFilters();
  })();

  var carousels=document.querySelectorAll('[data-carousel="partners"]');
  carousels.forEach(function(carousel){
    var track=carousel.querySelector('.partners-track');
    if(!track) return;
    var cards=Array.prototype.slice.call(track.children);
    if(!cards.length) return;
    var prevBtn=carousel.querySelector('.partners-nav.prev');
    var nextBtn=carousel.querySelector('.partners-nav.next');
    var section=carousel.closest('.partners');
    var progressBar=section?section.querySelector('.partners-progress-bar'):null;
    var prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var baseCount=cards.length;
    var autoFrame=null;
    var loopWidth=0;
    var autoSpeed=0.65;
    var offset=0;

    function getStep(){
      if(!cards.length) return 0;
      var cardWidth=cards[0].getBoundingClientRect().width;
      var styles=window.getComputedStyle(track);
      var gap=parseFloat(styles.columnGap||styles.gap||0);
      return cardWidth+gap;
    }

    function getLoopWidth(){
      if(!baseCount) return 0;
      var baseItems=Array.prototype.slice.call(track.children,0,baseCount);
      var last=baseItems[baseItems.length-1];
      if(!last) return 0;
      return last.offsetLeft+last.offsetWidth;
    }

    function prepareLoop(){
      if(track.dataset.loopReady==='true') return;
      var baseWidth=getLoopWidth();
      if(!baseWidth) return;
      var viewportWidth=carousel.clientWidth||track.clientWidth;
      var targetWidth=Math.max(viewportWidth*2,baseWidth*2);
      var copies=Math.max(1,Math.ceil(targetWidth/baseWidth)-1);
      for(var i=0;i<copies;i++){
        cards.forEach(function(card){
          var clone=card.cloneNode(true);
          clone.setAttribute('aria-hidden','true');
          track.appendChild(clone);
        });
      }
      cards=Array.prototype.slice.call(track.children);
      loopWidth=getLoopWidth();
      track.dataset.loopReady='true';
      offset=0;
      track.style.transform='translate3d(0,0,0)';
    }

    function updateProgress(){
      if(!progressBar) return;
      var base=loopWidth||1;
      var current=(((-offset)%base)+base)%base;
      var progress=base?current/base:1;
      progressBar.style.width=Math.min(100,Math.max(0,progress*100))+'%';
    }

    function ensureLoop(){
      prepareLoop();
      loopWidth=getLoopWidth();
    }

    function applyTransform(){
      track.style.transform='translate3d('+offset+'px,0,0)';
    }

    function scrollByStep(direction){
      var step=getStep();
      if(!step) return;
      ensureLoop();
      if(!loopWidth) return;
      offset+=direction==='next'?-step:step;
      if(-offset>=loopWidth){offset+=loopWidth;}
      else if(-offset<0){offset-=loopWidth;}
      applyTransform();
      updateProgress();
    }

    function tickAuto(){
      if(prefersReduced) return;
      ensureLoop();
      if(!loopWidth) return;
      offset-=autoSpeed;
      if(-offset>=loopWidth){offset+=loopWidth;}
      applyTransform();
      updateProgress();
      autoFrame=requestAnimationFrame(tickAuto);
    }

    function startAuto(){
      if(prefersReduced) return;
      ensureLoop();
      if(!loopWidth) return;
      if(autoFrame) cancelAnimationFrame(autoFrame);
      autoFrame=requestAnimationFrame(tickAuto);
    }

    function stopAuto(){
      if(autoFrame){
        cancelAnimationFrame(autoFrame);
        autoFrame=null;
      }
    }

    ensureLoop();
    updateProgress();
    applyTransform();

    if(prevBtn){
      prevBtn.addEventListener('click',function(){
        scrollByStep('prev');
        startAuto();
      });
    }
    if(nextBtn){
      nextBtn.addEventListener('click',function(){
        scrollByStep('next');
        startAuto();
      });
    }

    carousel.addEventListener('mouseenter',stopAuto);
    carousel.addEventListener('mouseleave',startAuto);
    carousel.addEventListener('focusin',stopAuto);
    carousel.addEventListener('focusout',startAuto);
    window.addEventListener('resize',function(){
      ensureLoop();
      updateProgress();
      applyTransform();
    });
    requestAnimationFrame(function(){
      ensureLoop();
      updateProgress();
      applyTransform();
      startAuto();
    });
  });
})();
