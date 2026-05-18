(()=>{
  'use strict';
  /*var
  ----------------------------------------------------------------------*/
  const DATAPREF = '-cmnjs';
  let globalKey = 'cmnjs';

  if(globalKey && window[globalKey]==null){
    window[globalKey]={};
  }else{
    globalKey = false;
  }







  /*module
  ----------------------------------------------------------------------*/



  (()=>{
    /*
     * 豎守畑繧｢繝ｳ繧ｫ繝ｼ繝ｪ繝ｳ繧ｯ繧ｯ繝ｪ繝�け譎ゅせ繝�繝ｼ繧ｺ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ
     * 蟇ｾ雎｡�喙data-cmnjs-smoothscroll][href*="#"]
     */
    const dataName = 'data'+DATAPREF+'-smoothscroll';
    document.addEventListener('click',function(e){
      if(e.target.closest('['+dataName+'][href*="#"]')){
        const anchorElm = e.target.hash?document.getElementById(e.target.hash.replace('#','')):document.getElementsByTagName('body')[0];
        if(anchorElm){
          anchorElm.scrollIntoView({ behavior: 'smooth'});
        }
        e.preventDefault();
      }
    });
  })();



  (()=>{
    /*
     * 繝上Φ繝舌�繧ｬ繝ｼ繝｡繝九Η繝ｼ繝懊ち繝ｳ
     * 繧ｯ繝ｪ繝�け縺ｧbody縺ｫ繧ｯ繝ｩ繧ｹ繧偵ヨ繧ｰ繝ｫ
     * 蟇ｾ雎｡縲[data-cmnjs-menubtn]
     */
    const dataName = 'data'+DATAPREF+'-menubtn';
    const bodyElm = document.querySelector('body');
    const activeClass = 'menu-open';
    document.addEventListener('click',function(e){
      if(e.target.closest(`[${dataName}]`)){
        bodyElm.classList.toggle(activeClass);
      }
    });
  })();


  /*
   * 繧｢繧ｳ繝ｼ繝�ぅ繧ｪ繝ｳ繧ｳ繝ｳ繧ｹ繝医Λ繧ｯ繧ｿ
   * 繝懊ち繝ｳ縺ｮ繧ｯ繝ｪ繝�け縺ｧ繝懊ち繝ｳ縺ｫ繧｢繧ｯ繝�ぅ繝悶け繝ｩ繧ｹ繧剃ｻ倅ｸ弱＠縲∝ｯｾ蠢懊☆繧九お繝ｪ繧｢繧帝幕髢峨い繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ
   * 髢矩哩蠕慧isplay繧ｹ繧ｿ繧､繝ｫ繧貞叙繧企勁縺阪√お繝ｪ繧｢縺ｫ繧｢繧ｯ繝�ぅ繝悶け繝ｩ繧ｹ繧剃ｻ倅ｸ弱☆繧�
   */
  const Accordion = function(opt){
    const self = this;
    self.btnElms = opt.btnElms;
    self.areaElms = opt.areaElms;
    self.activeBtnClass = opt.activeBtnClass || '';
    self.activeAreaClass = opt.activeAreaClass || '';
    self.openedFlg = opt.openedFlg;
    self.speed = opt.speed||200;
    self.onBeforeDisplayChange = opt.onBeforeDisplayChange || function(){};
    self.onAfterDisplayChange  = opt.onAfterDisplayChange  || function(){};
    self.busyFlg = false;
    self.useDisplayCheck = !!opt.useDisplayCheck;
    self.btnElms.forEach((btn)=>{
      btn.addEventListener('click',()=>{
        self.displayChange(!self.openedFlg);
      });
    });
    this.displayChange(self.openedFlg, true, true);
  };
  Accordion.prototype.displayChange = function(flg, noAnimationFlg, initFlg){
    const self = this;
    if(self.busyFlg){return;}
    let targetAreas = self.areaElms;
    if(!initFlg && self.useDisplayCheck){//繝ｬ繧ｹ繝昴Φ繧ｷ繝冶��縺ｧ陦ｨ遉ｺ蟾ｮ縺後↑縺��ｴ蜷医�蜍穂ｽ懊＆縺帙↑縺� area隍�焚譎ゑｼ代▽縺ｧ繧り｡ｨ遉ｺ蟾ｮ縺後≠繧句�ｴ蜷医�蜍輔￥
      targetAreas = [...self.areaElms].filter((area)=>{
        let visibleCheck = window.getComputedStyle(area).display !== 'none';
        if(visibleCheck === flg){return false;}//蜍穂ｽ懷燕縺ｫ縺吶〒縺ｫ蜍穂ｽ懷ｾ後�迥ｶ諷九�縺溘ａ辟｡蜉ｹ
        const hasActiveClass = area.classList.contains(self.activeAreaClass);
        //繧ｯ繝ｩ繧ｹ謫堺ｽ懷ｾ後�髢句ｧ狗憾諷九ｒ蛻､蛻･
        if(flg){
          area.classList.add(self.activeAreaClass);
          visibleCheck = window.getComputedStyle(area).display !== 'none';
          if(!hasActiveClass){//蜈��迥ｶ諷九↓謌ｻ縺�
            area.classList.remove(self.activeAreaClass);
          }
        }else{
          area.classList.remove(self.activeAreaClass);
          visibleCheck = window.getComputedStyle(area).display !== 'none';
          if(hasActiveClass){//蜈��迥ｶ諷九↓謌ｻ縺�
            area.classList.add(self.activeAreaClass);
          }
        }
        if(visibleCheck !== flg){return false;}//繧ｯ繝ｩ繧ｹ謫堺ｽ懷ｾ後↓逶ｮ逧��迥ｶ諷九↓縺ｪ繧峨↑縺�◆繧∫┌蜉ｹ
        return true;
      });
      if(!targetAreas.length){
        return;//迥ｶ諷句､牙喧繧定ｵｷ縺薙☆area縺悟ｭ伜惠縺励↑縺�◆繧∫┌蜉ｹ
      }
    }
    self.busyFlg = true;
    if(self.onBeforeDisplayChange(flg) === false){
      self.busyFlg = false;
      return;
    }
    const speed = noAnimationFlg? 0: self.speed;
    const promiseArr = [];
    if(flg){//open
      self.btnElms.forEach((btn)=>{
        btn.classList.add(self.activeBtnClass);
        btn.setAttribute('aria-expanded', 'true');
      });
      targetAreas.forEach((area)=>{
        const p = self.slideDown(area,speed);
        p.then(()=>{
          area.classList.add(self.activeAreaClass);
          area.style.display = '';
        });
        promiseArr.push(p);
      });
    }else{//close
      self.btnElms.forEach((btn)=>{
        btn.classList.remove(self.activeBtnClass);
        btn.setAttribute('aria-expanded', 'false');
      });
      targetAreas.forEach((area)=>{
        const p = self.slideUp(area,speed);
        p.then(()=>{
          area.classList.remove(self.activeAreaClass);
          area.style.display = '';
        });
        promiseArr.push(p);
      });
    }
    Promise.all(promiseArr).then(()=>{
      self.areaElms.forEach((area)=>{
        if(flg){
          area.classList.add(self.activeAreaClass);
          area.style.display = '';
        }else{
          area.classList.remove(self.activeAreaClass);
          area.style.display = '';
        }
      });
      self.openedFlg = flg;
      self.onAfterDisplayChange(flg);
      self.busyFlg = false;
    });
  };
  Accordion.prototype.slideDown = function(element, duration){
    return new Promise(resolve => {
      const startHeight = element.clientHeight;
      element.style.display = 'block';
      const endHeight = element.scrollHeight;
      element.style.height = `${startHeight}px`;
      element.style.overflow = 'hidden';
      function ease(p){
        return 0.5 - Math.cos( p * Math.PI) / 2;
      }
      let startTime = performance.now();
      function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.style.height = `${startHeight + (endHeight - startHeight) * ease(progress)}px`;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.style.display = '';
          element.style.height = '';
          element.style.overflow = '';
          resolve();
        }
      }
      requestAnimationFrame(animate);
    });
  };
  Accordion.prototype.slideUp = function(element, duration){
    return new Promise(resolve => {
      const startHeight = element.scrollHeight;
      element.style.height = `${startHeight}px`;
      element.style.overflow = 'hidden';
      function ease(p){
        return 0.5 - Math.cos( p * Math.PI) / 2;
      }
      const startTime = performance.now();
      function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.style.height = `${startHeight - (startHeight * ease(progress))}px`;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.style.height = '';
          element.style.overflow = '';
          resolve();
        }
      }
      requestAnimationFrame(animate);
    });
  };
  if(globalKey){window[globalKey].Accordion = Accordion;}

  (()=>{
    /*
     * 繝ｩ繝�ヱ繝ｼ豎守畑蝙帰ccordion縺ｮ逕滓�
     *  繝ｩ繝�ヱ繝ｼ�喙data-cmnjs-accordion-wrap]
     *  繝懊ち繝ｳ縲�喙data-cmnjs-accordion-wrap] [data-cmnjs-accordion-btn]
     *  繧ｨ繝ｪ繧｢縲�喙data-cmnjs-accordion-wrap] [data-cmnjs-accordion-area]
     *  繧｢繧ｯ繝�ぅ繝悶�繧ｿ繝ｳ繝ｻ繧ｨ繝ｪ繧｢縺ｫ莉倅ｸ弱＆繧後ｋ繧ｯ繝ｩ繧ｹ�啾ccordionActive
     *  繝ｩ繝�ヱ繝ｼ縺ｮ data-cmnjs-accordion-active 螻樊ｧ縺ｮ謖�ｮ壹′縺ゅｌ縺ｰ蛻晄悄迥ｶ諷九〒髢九￥
     */
    const wrapData = 'data'+DATAPREF+'-accordion-wrap';
    const btnData = 'data'+DATAPREF+'-accordion-btn';
    const areaData = 'data'+DATAPREF+'-accordion-area';
    const activeClass = 'accordionActive';
    const defaultOpendData = 'data'+DATAPREF+'-accordion-active';
    //繝ｩ繝�ヱ繝ｼ豎守畑蝙狗函謌�
    document.querySelectorAll(`[${wrapData}]`).forEach((wrapElm)=>{
      const btnElms = wrapElm.querySelectorAll(`[${btnData}]:not(:scope [${wrapData}] [${btnData}])`);
      const areaElms = wrapElm.querySelectorAll(`[${areaData}]:not(:scope [${wrapData}] [${areaData}])`);
      if(btnElms.length && areaElms.length){
        new Accordion({
          btnElms:btnElms,
          areaElms:areaElms,
          activeBtnClass: activeClass,
          activeAreaClass: activeClass,
          openedFlg: wrapElm.hasAttribute(defaultOpendData),
          useDisplayCheck: true,
        });
      }
    });
  })();

  /*
   * 繧ｿ繝門�譖ｿ繧ｳ繝ｳ繧ｹ繝医Λ繧ｯ繧ｿ
   * 繝懊ち繝ｳ縺ｮ繧ｯ繝ｪ繝�け縺ｧ繝懊ち繝ｳ縺ｨ蟇ｾ雎｡繧ｨ繝ｪ繧｢縺ｫ繧｢繧ｯ繝�ぅ繝悶け繝ｩ繧ｹ繧剃ｻ倅ｸ�
   * 繝懊ち繝ｳ縺ｨ繧ｨ繝ｪ繧｢縺ｮ邏蝉ｻ倥￠縺ｯDOM鬆�分縺ｫ萓晏ｭ�
   */
  const TabChange = function(opt){
    const self = this;
    const def = opt.def-0||0;
    this.curSeq = -1;
    self.pref = opt.pref;
    self.wrapElm = opt.wrapElm;
    self.btnArr = opt.btnArr;
    self.areaArr = opt.areaArr;
    self.cls = {
      activeBtn: opt.activeBtnClass || '',
      activeArea: opt.activeAreaClass || '',
    };
    self.onTabChanged = opt.onTabChanged;
    self.btnArr.forEach(function(btn,index){
      btn.addEventListener('click',function(){
        const targetIndex = ((index) => {
          const targetIndex = btn.getAttribute(`${self.pref}-btn`);
          return targetIndex === '' ? index : Number(targetIndex);
        })(index);

        // 繧ｿ繝門�繧頑崛縺亥燕縺ｮ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ菴咲ｽｮ繧剃ｿ晄戟縺励※縺翫￥�医せ繧ｯ繝ｭ繝ｼ繝ｫ繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ逕ｨ��
        const scrollPosition = { x: window.scrollX, y: window.scrollY, };
        self.changeTab(targetIndex);
        self.scrollTo(btn.getAttribute(`${self.pref}-scrollto`), scrollPosition);
      });
    });
    self.changeTab(def);
  };
  TabChange.prototype.changeTab = function(nextSeq){
    const self = this;
    if(self.curSeq === nextSeq){
      return;
    }
    //蛻晄悄蛹匁凾繧帝勁縺阪√Ξ繧ｹ繝昴Φ繧ｷ繝冶��縺ｧ譌｢縺ｫ陦ｨ遉ｺ縺輔ｌ縺ｦ縺�ｋ蝣ｴ蜷育┌蜉ｹ
    if(this.curSeq !== -1 && window.getComputedStyle(self.areaArr[nextSeq]).display !== 'none'){
      return;
    }
    self.btnArr.forEach(function(btn,index){
      if(index === nextSeq || btn.getAttribute(`${self.pref}-btn`) === String(nextSeq)){
        // 繝懊ち繝ｳ縺ｮindex縲√ｂ縺励￥縺ｯ螻樊ｧ蛟､縺ｮ蛟､縺悟酔荳縺ｮ蝣ｴ蜷�
        btn.classList.add(self.cls.activeBtn);
      }else{
        btn.classList.remove(self.cls.activeBtn);
      }
    });
    self.areaArr.forEach(function(area,index){
      if(index === nextSeq){
        area.classList.add(self.cls.activeArea);
      }else{
        area.classList.remove(self.cls.activeArea);
      }
    });
    self.curSeq = nextSeq;
    typeof self.onTabChanged === 'function' && self.onTabChanged();
  };

  /**
   * scrollTo
   * 繧ｿ繝悶メ繧ｧ繝ｳ繧ｸ蠕後∝ｯｾ雎｡縺ｮ隕∫ｴ�縺ｾ縺ｧ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺吶ｋ
   * @param {*} selector 
   * @returns 
   */
  TabChange.prototype.scrollTo = function (selector, scrollPosition) {
    if (!selector) {
      return;
    }

    if (scrollPosition) {
      window.scrollTo(scrollPosition.x, scrollPosition.y);
    }

    const top = (() => {
      // selector縺ｧ縲契wrap_縲肴欠螳壹＆繧後※縺�ｋ蝣ｴ蜷医√ち繝悶さ繝ｳ繝�Φ繝��wrap縺ｫ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺吶ｋ
      // 縺昴ｌ莉･螟悶�繧ｻ繝ｬ繧ｯ繧ｿ縺ｧ謖�ｮ壹＆繧後◆隕∫ｴ�縺ｫ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺吶ｋ
      const rect =
        (selector === '_wrap_' ? this.wrapElm : document.querySelector(`.${selector}`))
          .getBoundingClientRect().top;
      const offset = window.scrollY;
      return rect + offset;
    })();

    window
      .scrollTo({
        top,
        behavior: 'smooth',
      });
  };
  if(globalKey){window[globalKey].TabChange = TabChange;}



  (()=>{
    /*
     * 繝ｩ繝�ヱ繝ｼ豎守畑蝙� TabChange 縺ｮ逕滓�
     *  繝ｩ繝�ヱ繝ｼ�喙data-cmnjs-tabchange-wrap]
     *  繝懊ち繝ｳ縲�喙data-cmnjs-tabchange-wrap] [data-cmnjs-tabchange-btn]
     *  繧ｨ繝ｪ繧｢縲�喙data-cmnjs-tabchange-wrap] [data-cmnjs-tabchange-area]
     *  繧｢繧ｯ繝�ぅ繝悶�繧ｿ繝ｳ繝ｻ繧ｨ繝ｪ繧｢縺ｫ莉倅ｸ弱＆繧後ｋ繧ｯ繝ｩ繧ｹ�嗾abActive
     *  繝ｩ繝�ヱ繝ｼ縺ｮ data-cmnjs-tabchange-def 螻樊ｧ縺ｧ蛻晄悄繧ｿ繝悶�繧ｷ繝ｼ繧ｱ繝ｳ繧ｹ繧呈欠螳壼庄
     */
    const pref = 'data'+DATAPREF+'-tabchange';
    const wrapData = pref+'-wrap';
    const btnData = pref+'-btn';
    const areaData = pref+'-area';
    const defaultSeqData = pref+'-def';
    const activeClass = 'tabActive';

    document.querySelectorAll(`[${wrapData}]`).forEach((wrapElm)=>{
      const btnElms = wrapElm.querySelectorAll(`[${btnData}]:not(:scope [${wrapData}] [${btnData}])`);
      const areaElms = wrapElm.querySelectorAll(`[${areaData}]:not(:scope [${wrapData}] [${areaData}])`);
      if(btnElms.length && areaElms.length){
        const tabContent = new TabChange({
          pref,
          wrapElm,
          btnArr: btnElms,
          areaArr: areaElms,
          activeBtnClass: activeClass,
          activeAreaClass: activeClass,
          def: wrapElm.getAttribute(defaultSeqData),
        });

        // URL繝代Λ繝｡繝ｼ繧ｿ縺ｧ謖�ｮ壹＆繧後◆繧ｿ繝悶ｒ髢九＞縺ｦ陦ｨ遉ｺ
        (() => {
          const [tabContentName, index] = (() => {
            const url = new URL(location);
            const tabContentName = url.searchParams.get('tab-content-name');
            const index = url.searchParams.get('index');

            return [tabContentName, index];
          })();

          if (wrapElm.getAttribute('data-cmnjs-tabchange-wrap') === tabContentName && index !== null) {
            // 蟇ｾ雎｡縺ｮ繧ｿ繝悶さ繝ｳ繝�Φ繝�√°縺､index縺梧欠螳壹＆繧後※縺�ｋ蝣ｴ蜷�
            tabContent.changeTab(Number(index));
            tabContent.scrollTo('list-makeup-area');
          }
        })();
      }
    });
  })();





  /*
   * window繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ逶｣隕悶さ繝ｳ繧ｹ繝医Λ繧ｯ繧ｿ
   */
  const Scrollwatch = function(opt){
    const self = this;
    self.target = opt.target;
    self.scrolledClass = opt.scrolledClass;
    self.scrollThreshold = opt.scrollThreshold || 1;
    self.savedState = null;
    let ticking = false;
    function handleEvent(){
      if(!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          self.checkScroll();
          ticking = false;
        });
      }
    }
    window.addEventListener('scroll', handleEvent, {passive:true});
    window.addEventListener('resize', handleEvent, {passive:true});
    handleEvent();
  };
  Scrollwatch.prototype.checkScroll = function(){
    const self = this;
    const curState = window.scrollY >= self.scrollThreshold;
    if(self.savedState === curState){return;}//螟画峩縺ｪ縺�
    if(curState){
      self.target.classList.add(self.scrolledClass);
    }else{
      self.target.classList.remove(self.scrolledClass);
    }
    self.savedState = curState;
  };
  if(globalKey){window[globalKey].Scrollwatch = Scrollwatch;}

  (()=>{
    /*
     * 豎守畑window繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ逶｣隕�
     * 蟇ｾ雎｡隕∫ｴ��喙data-cmnjs-scrollwatch=髢ｾ蛟､(譛ｪ謖�ｮ壽凾100)]
     * 髢ｾ蛟､px莉･荳翫せ繧ｯ繝ｭ繝ｼ繝ｫ縺励◆蝣ｴ蜷医↓莉倅ｸ弱☆繧九け繝ｩ繧ｹ�嘖crollwatchScrolled
     */
    const scrollwatchData = 'data'+DATAPREF+'-scrollwatch';
    document.querySelectorAll(`[${scrollwatchData}]`).forEach((elm)=>{
      let param = elm.getAttribute(scrollwatchData);
      const defaultNum = 100;
      param = param?Number(param):defaultNum;
      new Scrollwatch({
        target: elm,
        scrolledClass: 'scrollwatchScrolled',
        scrollThreshold: isNaN(param)?defaultNum:param
      });
    });
  })();

  (() => {
    /**
     * 譌｢蟄倥ヵ繝�ち繝ｼ逕ｨ繝医ャ繝励↓謌ｻ繧�
     */
    document.querySelectorAll('.top_back_btn').forEach((elm)=>{
      const scrollThreshold = 1500;
      new Scrollwatch({
        target: elm,
        scrolledClass: 'scrollwatchScrolled',
        scrollThreshold,
      });
    });
  })()


  /*
   * 繝昴ず繧ｷ繝ｧ繝ｳ逶｣隕悶さ繝ｳ繧ｹ繝医Λ繧ｯ繧ｿ
   */
  const Poswatch = function(opt){
    const self = this;
    self.targetElm = opt.targetElm;
    self.posClasses = {
      bottomDw: null,
      bottomOn: null,
      bottomUp: null,
      topDw: null,
      topOn: null,
      topUp: null,
      ...opt.posClasses
    };
    self.state = {
      top: null,
      bottom: null,
    };
    //繧､繝吶Φ繝亥牡繧雁ｽ薙※
    let ticking = false;
    function handleEvent(){
      if(!ticking){
        ticking = true;
        window.requestAnimationFrame(()=>{
          self.checkPos();
          ticking = false;
        });
      }
    }
    window.addEventListener('scroll',handleEvent,{passive:true});
    window.addEventListener('resize',handleEvent,{passive:true});
    handleEvent();
  };
  Poswatch.prototype.checkPos= function(){
    const self = this;
    const param = {top:null,bottom:null};
    const rect = self.targetElm.getBoundingClientRect();
    if(rect.top>0){//荳願ｾｺ繧医ｊ荳�
      param.top = -1;
    }else if(rect.bottom < 0){//荳願ｾｺ繧医ｊ荳�
      param.top = 1;
    }else{//荳願ｾｺ縺ｫ驥阪↑縺｣縺ｦ縺�ｋ
      param.top = 0;
    }
    if(rect.top>window.innerHeight){//荳玖ｾｺ繧医ｊ荳�
      param.bottom = -1;
    }else if(rect.bottom<window.innerHeight){//荳玖ｾｺ繧医ｊ荳�
      param.bottom = 1;
    }else{//荳玖ｾｺ縺ｫ驥阪↑縺｣縺ｦ縺�ｋ
      param.bottom = 0;
    }
    //螟牙喧縺檎函縺倥※縺�ｋ蝣ｴ蜷亥�逅�ｮ溯｡�
    if(param.top !== self.state.top || param.bottom !== self.state.bottom){
      self.state.top = param.top;
      self.state.bottom = param.bottom;
      self.syncState();
    }
  };
  Poswatch.prototype.syncState = function(){//迥ｶ諷九↓蠢懊§縺溷�逅�
    const self = this;
    const addClsArr = [];
    const removeClsArr = [];
    if(self.state.top===1){
      addClsArr.push(self.posClasses.topUp);
      removeClsArr.push(self.posClasses.topDw);
      removeClsArr.push(self.posClasses.topOn);
    }else if(self.state.top===-1){
      addClsArr.push(self.posClasses.topDw);
      removeClsArr.push(self.posClasses.topOn);
      removeClsArr.push(self.posClasses.topUp);
    }else if(self.state.top===0){
      addClsArr.push(self.posClasses.topOn);
      removeClsArr.push(self.posClasses.topDw);
      removeClsArr.push(self.posClasses.topUp);
    }
    if(self.state.bottom===1){
      addClsArr.push(self.posClasses.bottomUp);
      removeClsArr.push(self.posClasses.bottomDw);
      removeClsArr.push(self.posClasses.bottomOn);
    }else if(self.state.bottom===-1){
      addClsArr.push(self.posClasses.bottomDw);
      removeClsArr.push(self.posClasses.bottomOn);
      removeClsArr.push(self.posClasses.bottomUp);
    }else if(self.state.bottom===0){
      addClsArr.push(self.posClasses.bottomOn);
      removeClsArr.push(self.posClasses.bottomDw);
      removeClsArr.push(self.posClasses.bottomUp);
    }
    self.targetElm.classList.add(...addClsArr.filter(v => v != null));
    self.targetElm.classList.remove(...removeClsArr.filter(v => v != null));
  }; 
  if(globalKey){window[globalKey].Poswatch = Poswatch;}



  (()=>{
    /*
     * 豎守畑繝昴ず繧ｷ繝ｧ繝ｳ逶｣隕�
     * 蟇ｾ雎｡隕∫ｴ��喙data-cmnjs-poswatch]
     * 隕∫ｴ�縺後え繧｣繝ｳ繝峨え縺ｮ荳玖ｾｺ繧医ｊ繧ゆｸ九↓縺�ｋ蝣ｴ蜷医↓莉倅ｸ弱☆繧九け繝ｩ繧ｹ:poswatchBottomDw
     * 隕∫ｴ�縺後え繧｣繝ｳ繝峨え縺ｮ荳玖ｾｺ縺ｫ驥阪↑縺｣縺ｦ縺�ｋ蝣ｴ蜷医↓莉倅ｸ弱☆繧九け繝ｩ繧ｹ:poswatchBottomOn
     * 隕∫ｴ�縺後え繧｣繝ｳ繝峨え縺ｮ荳玖ｾｺ繧医ｊ繧ゆｸ翫↓縺�ｋ蝣ｴ蜷医↓莉倅ｸ弱☆繧九け繝ｩ繧ｹ:poswatchBottomUp
     * 隕∫ｴ�縺後え繧｣繝ｳ繝峨え縺ｮ荳願ｾｺ繧医ｊ繧ゆｸ九↓縺�ｋ蝣ｴ蜷医↓莉倅ｸ弱☆繧九け繝ｩ繧ｹ:poswatchTopDw
     * 隕∫ｴ�縺後え繧｣繝ｳ繝峨え縺ｮ荳願ｾｺ縺ｫ驥阪↑縺｣縺ｦ縺�ｋ蝣ｴ蜷医↓莉倅ｸ弱☆繧九け繝ｩ繧ｹ:poswatchTopOn
     * 隕∫ｴ�縺後え繧｣繝ｳ繝峨え縺ｮ荳願ｾｺ繧医ｊ繧ゆｸ翫↓縺�ｋ蝣ｴ蜷医↓莉倅ｸ弱☆繧九け繝ｩ繧ｹ:poswatchTopUp
     */
    const poswatchData = 'data'+DATAPREF+'-poswatch';
    document.querySelectorAll(`[${poswatchData}]`).forEach(function(elm){
      new Poswatch({
        targetElm: elm,
        posClasses: {
          bottomDw: 'poswatchBottomDw',
          bottomOn: 'poswatchBottomOn',
          bottomUp: 'poswatchBottomUp',
          topDw: 'poswatchTopDw',
          topOn: 'poswatchTopOn',
          topUp: 'poswatchTopUp',
        }
      });
    });
  })();




})();

/*
  * 繝薙Η繝ｼ繝昴�繝亥�+荳九°繧�30%縺ｮ菴咲ｽｮ縺ｧ蟇ｾ雎｡縺ｫinview繧ｯ繝ｩ繧ｹ繧剃ｻ倅ｸ�
  * 繧ｿ繝ｼ繧ｲ繝�ヨ蜀�↓YouTube縺ｮiframe縺後≠繧句�ｴ蜷亥�逕溘☆繧�
  * 繝ｻ繧ｿ繝ｼ繧ｲ繝�ヨ�喙data-js-inview-01]
  */
(() => {
  const dataAttr = 'data-js-inview-01';
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview');

        // YouTube縺ｮiframe縺後≠繧句�ｴ蜷亥�逕溘☆繧�
        const iframe = entry.target.querySelector('iframe');
        if (iframe && iframe.src.startsWith('https://www.youtube.com/embed/')
          && entry.target === iframe.closest(`[${dataAttr}]`)) {
          iframe.contentWindow.postMessage(
            '{"event":"command", "func":"playVideo", "args":""}',
            'https://www.youtube.com'
          );
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, 
    rootMargin: '0px 0px -30% 0px',
    threshold: 0
  });

  // entry point
  document.querySelectorAll(`[${dataAttr}]`)
    .forEach((elm)=>{
      observer.observe(elm);
    });
})();

(() => {
  /**
   * MoreContent
   * 縲後ｂ縺｣縺ｨ隕九ｋ縲�
   */
  class MoreContent {
    /**
     * constructor
     * @param {*} options 
     */
    constructor (options) {
      this.dataName = options.dataName;
      this.wrap = options.wrap;
      this.buttons = this.wrap.querySelectorAll(`.js-${this.dataName}-button`);

      this.initialize();
    }

    /**
     * initialize
     */
    initialize () {
      this.buttons
        .forEach((button, index) => {
          button
            .addEventListener('click', (e) => {
              this.open();
            });
        });
    }

    /**
     * open
     */
    open () {
      this.wrap.classList.add('open');
    }
  }

  // entry point
  const dataName = 'more-content';
  document.querySelectorAll(`.js-${dataName}-wrap`)
    .forEach((wrap, index) => {
      new MoreContent({
        dataName,
        wrap,
      });
    });
})();

(()=>{
  /**
   * 譌｢蟄倥ヵ繝�ち繝ｼ逕ｨ繝医ャ繝励↓謌ｻ繧�
   */
  document.addEventListener('click', (e) => {
    if(e.target.closest('.top_back_btn')){
      const anchorElm = e.target.hash ?
        document.getElementById(e.target.hash.replace('#','')) :
        document.getElementsByTagName('body')[0];

      if(anchorElm){
        anchorElm.scrollIntoView({ behavior: 'smooth'});
      }

      e.preventDefault();
    }
  });
})();

(() => {
  /**
   * IncludeContent
   * 繧ｳ繝ｳ繝�Φ繝��蜍慕噪隱ｭ縺ｿ霎ｼ縺ｿ
   */
  class IncludeContent {
    /**
     * constructor
     * @param {*} options
     */
    constructor (options) {
      this.dataName = options.dataName;
      this.target = options.target;
      this.url = this.target.getAttribute(this.dataName);

      this.initialize();
    }

    /**
     * initialize
     */
    initialize () {
      fetch(
        this.url,
        { cache: 'no-store', }
      )
        .then((response) => {
          if (response.ok) {
            return response.text();
          }

          throw new Error('Network response was not ok.');
        })
        .then((text) => {
          this.target.innerHTML = text;

          // 繧ｳ繝斐�繝ｩ繧､繝医�蟷ｴ蜿ｷ
          const copyrightYear = this.target.querySelector('#copyright_year');
          if (copyrightYear) {
            const fullYear = new Date().getFullYear();
            copyrightYear.textContent = fullYear;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // entry point
  const dataName = 'data-include-content';
  document.querySelectorAll(`[${dataName}]`)
    .forEach((target, indext) => {
      new IncludeContent({
        dataName,
        target,
      });
    });
})();

/**
 * 繧ｵ繧､繝峨ラ繝ｭ繝ｯ繝ｼ繝｡繝九Η繝ｼ謫堺ｽ懈凾縲�
 * 蜷御ｸ繝壹�繧ｸ蜀��遘ｻ縺ｮ蝣ｴ蜷医√し繧､繝峨ラ繝ｭ繝ｯ繝ｼ繝｡繝九Η繝ｼ繧帝哩縺倥ｋ
 */
(() => {
  document.addEventListener('click', (e) => {
    const target = (() => {
      const anchor = (e.target || e.currentTarget).closest('a.link');
      return anchor?.closest('.wrap-area-menu') ? anchor : null;
    })();

    if (target) {
      document.body.classList.remove('menu-open');
    }
  });
})();