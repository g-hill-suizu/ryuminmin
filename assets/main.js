
// ***********ハンバーガーメニュー***********


$(function () {
    $('.ham-trigger').on('click', function () {
        $(this).toggleClass('ham_active');
        $('header').toggleClass('open_active');
        return false;
    });
});


// ***********アコーティオン開閉***********

document.addEventListener("DOMContentLoaded", () => {
    setUpAccordion();
});

/**
 * ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御します
 */
    const setUpAccordion = () => {
    const details = document.querySelectorAll(".js-details");
    const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
    const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

    details.forEach((element) => {
        const summary = element.querySelector(".js-summary");
        const content = element.querySelector(".js-answer");

        summary.addEventListener("click", (event) => {
        // デフォルトの挙動を無効化
        event.preventDefault();

        // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
        if (element.dataset.animStatus === RUNNING_VALUE) {
            return;
        }

        // detailsのopen属性を判定
        if (element.open) {
            // アコーディオンを閉じるときの処理
            // アイコン操作用クラスを切り替える(クラスを取り除く)
            element.classList.toggle(IS_OPENED_CLASS);

            // アニメーションを実行
            const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
            // アニメーション実行中用の値を付与
            element.dataset.animStatus = RUNNING_VALUE;

            // アニメーションの完了後に
            closingAnim.onfinish = () => {
            // open属性を取り除く
            element.removeAttribute("open");
            // アニメーション実行中用の値を取り除く
            element.dataset.animStatus = "";
            };
        } else {
            // アコーディオンを開くときの処理
            // open属性を付与
            element.setAttribute("open", "true");

            // アイコン操作用クラスを切り替える(クラスを付与)
            element.classList.toggle(IS_OPENED_CLASS);

            // アニメーションを実行
            const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
            // アニメーション実行中用の値を入れる
            element.dataset.animStatus = RUNNING_VALUE;

            // アニメーション完了後にアニメーション実行中用の値を取り除く
            openingAnim.onfinish = () => {
            element.dataset.animStatus = "";
            };
        }
        });
    });
}

/**
 * アニメーションの時間とイージング
 */
const animTiming = {
    duration: 400,
    easing: "ease-out"
};

/**
 * アコーディオンを閉じるときのキーフレーム
 */
const closingAnimKeyframes = (content) => [
    {
    height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
    opacity: 1,
    }, {
    height: 0,
    opacity: 0,
    }
];

/**
 * アコーディオンを開くときのキーフレーム
 */
const openingAnimKeyframes = (content) => [
    {
    height: 0,
    opacity: 0,
    }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
    }
];

/*　　タブ切り替え */
const tab_elements = document.getElementsByName('tab-radio');
const tab_panel_a = document.querySelector('.panel-a');
const tab_panel_b = document.querySelector('.panel-b');
tab_elements.forEach( tab_element  =>{
    tab_element.addEventListener('click', function(){
        if (tab_element.id == 'tab-a'){
            tab_panel_a.style.display = 'block';
            tab_panel_b.style.display = 'none';
            tab_panel_c.style.display = 'none';
        }else if (tab_element.id == 'tab-b'){
            tab_panel_a.style.display = 'none';
            tab_panel_b.style.display = 'block';
            tab_panel_c.style.display = 'none';
        }
        // 選択されたかどうかを示すクラス名「selected」の付与と削除
        tab_elements.forEach( tab_element =>{
            tab_element.nextElementSibling.classList.remove('selected');
        });
        tab_element.nextElementSibling.classList.add('selected');
    });
});

// ヘッダーの高さ分だけコンテンツを下げる
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();

            const header = document.querySelector("header");
            const headerHeight = header ? header.offsetHeight : 0;
            const href = this.getAttribute("href");
            const targetElement = document.querySelector(href);

            if (targetElement) {
                const position = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });
            }
        });
    });
});