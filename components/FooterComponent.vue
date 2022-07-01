<template>
  <footer id="footer">
    <div class="container">
      <div class="top-footer">
        <div class="top-footer__info">
          <div class="top-footer__info-about">
            <a href="/" class="logo-link" />
            <p class="top-footer__info-description">
              ООО “Beta” do things
            </p>
          </div>
          <p class="top-footer__info-address">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
          <p class="top-footer__time">
            С 8:00 до 20:00 ежедневно
          </p>
          <a href="#">
            <svg class="top-footer__info-svg" width="40px" height="40px"><use xlink:href="@/assets/images/sprites.svg#site-map" /></svg>
          </a>
        </div>
        <div class="top-footer__catalog">
          <span class="top-footer__catalog-title">Каталог</span>
          <ul class="top-footer__catalog-list">
            <li class="top-footer__catalog-item">
              <a href="#">Lorem</a>
            </li>
            <li class="top-footer__catalog-item">
              <a href="#">ipsum</a>
            </li>
            <li class="top-footer__catalog-item">
              <a href="#">dolor</a>
            </li>
            <li class="top-footer__catalog-item">
              <a href="#">sit</a>
            </li>
            <li class="top-footer__catalog-item">
              <a href="#">amet</a>
            </li>
            <li class="top-footer__catalog-item">
              <a href="#">consectetur</a>
            </li>
            <li class="top-footer__catalog-item">
              <a href="#">adipisicing</a>
            </li>
            <li class="top-footer__catalog-item">
              <a href="#">elit</a>
            </li>
            <li class="top-footer__catalog-item">
              <a href="#">ipsum</a>
            </li>
            <li class="top-footer__catalog-item">
              <a href="#">amet</a>
            </li>
          </ul>
        </div>
        <div class="top-footer__services">
          <span class="top-footer__services-title">Услуги</span>
          <ul class="top-footer__services-list">
            <li class="top-footer__services-item">
              <a href="#">Lorem</a>
            </li>
            <li class="top-footer__services-item">
              <a href="#">ipsum dolor</a>
            </li>
            <li class="top-footer__services-item">
              <a href="#">consectetur</a>
            </li>
          </ul>
        </div>
        <div class="top-footer__about">
          <span class="top-footer__about-title">О компании</span>
          <ul class="top-footer__about-list">
            <li class="top-footer__about-item">
              <a href="/">Контакты</a>
            </li>
            <li class="top-footer__about-item">
              <a href="/">Статьи</a>
            </li>
            <li class="top-footer__about-item">
              <a href="/">Доставка</a>
            </li>
            <li class="top-footer__about-item">
              <a href="/">Вопрос-ответ</a>
            </li>
            <li class="top-footer__about-item">
              <a href="/">ГОСТы</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="top-footer__contacts">
        <div class="top-footer__numbers">
          <span class="top-footer__contacts-title">Контакты</span>
          <a href="tel:+12223334455" class="top-footer__contacts-number">+1 (222) 333-44-55</a>
          <a href="tel:+12223334455" class="top-footer__contacts-number">+1 (222) 333-44-55</a>
          <a href="tel:+12223334455" class="top-footer__contacts-number">+1 (222) 333-44-55</a>
        </div>
        <div class="top-footer__messangers">
          <a class="top-footer__contacts-mail" href="mailto:mail@mail.com">mail@mail.com</a>
          <a href="#" class="top-footer__callback">Обратный звонок</a>
          <ul class="top-footer__social-list">
            <li class="top-footer__social-item">
              <a href="#" class="top-footer__social-link">
                <svg class="top-footer__social-svg telegram-color" width="35px" height="35px"><use xlink:href="@/assets/images/sprites.svg#telegram" /></svg>
              </a>
            </li>
            <li class="top-footer__social-item">
              <a href="#" class="top-footer__social-link">
                <svg class="top-footer__social-svg whatsapp-color" width="35px" height="35px"><use xlink:href="@/assets/images/sprites.svg#whatsapp" /></svg>
              </a>
            </li>
            <li class="top-footer__social-item">
              <a href="#" class="top-footer__social-link">
                <svg class="top-footer__social-svg viber-color" width="35px" height="35px"><use xlink:href="@/assets/images/sprites.svg#viber" /></svg>
              </a>
            </li>
          </ul>
        </div>
        <div class="top-footer__accept-block">
          <span class="top-footer__accept-title">Принимаем к оплате:</span>
          <ul class="top-footer__accept-list">
            <li class="top-footer__accept-item">
              <svg width="40px" height="40px"><use xlink:href="@/assets/images/sprites.svg#master-card" /></svg>
            </li>
            <li class="top-footer__accept-item">
              <svg width="40px" height="40px"><use xlink:href="@/assets/images/sprites.svg#master-card" /></svg>
            </li>
            <li class="top-footer__accept-item">
              <svg width="40px" height="40px"><use xlink:href="@/assets/images/sprites.svg#master-card" /></svg>
            </li>
            <li class="top-footer__accept-item">
              <svg width="40px" height="40px"><use xlink:href="@/assets/images/sprites.svg#master-card" /></svg>
            </li>
            <li class="top-footer__accept-item">
              <svg width="40px" height="40px"><use xlink:href="@/assets/images/sprites.svg#master-card" /></svg>
            </li>
            <li class="top-footer__accept-item">
              <svg width="40px" height="40px"><use xlink:href="@/assets/images/sprites.svg#master-card" /></svg>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom-footer">
        <p class="bottom-footer__copyright">
          Копирайт ООО "Beta"
        </p>
        <p class="bottom-footer__public">
          Публичная оферта и другие данные
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

#footer {
    padding: 40px 0;
    background-color: $footerBackground;
}

.top-footer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.top-footer__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 20%;
    margin-right: 10px;
}

.top-footer__info-about {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.top-footer__info-about .logo-link {
    margin-right: 20px;
}

.top-footer__info-description {
    font-size: 14px;
    color: $white;
}

.top-footer__info-address {
    margin-bottom: 7px;
    font-size: 14px;
    color: $white;
}

.top-footer__time {
    margin-bottom: 20px;
    font-size: 14px;
    color: $white;
}

.top-footer__info-svg {
    transition: fill 300ms ease;
}

.top-footer__info-svg:hover {
    fill: $brandColor;
}

.top-footer__catalog {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
}

.top-footer__catalog-title {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 500;
    color: $white;
}

.top-footer__catalog-list {
    display: flex;
    flex-direction: column;
}

.top-footer__catalog-item:not(:last-child) {
    margin-bottom: 15px;
}

.top-footer__catalog-item a {
    font-size: 18px;
    color: $shadow;
    transition: color 300ms ease;
}

.top-footer__catalog-item a:hover {
    color: $white;
}

.top-footer__services {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
}

.top-footer__services-title {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 500;
    color: $white;
}

.top-footer__services-list {
    display: flex;
    flex-direction: column;
}

.top-footer__services-item:not(:last-child) {
    margin-bottom: 15px;
}

.top-footer__services-item a {
    font-size: 18px;
    color: $shadow;
    transition: color 300ms ease;
}

.top-footer__services-item a:hover {
    color: $white;
}

.top-footer__about {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
}

.top-footer__about-title {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 500;
    color: $white;
}

.top-footer__about-list {
    display: flex;
    flex-direction: column;
}

.top-footer__about-item:not(:last-child) {
    margin-bottom: 15px;
}

.top-footer__about-item a {
    font-size: 18px;
    color: $shadow;
    transition: color 300ms ease;
}

.top-footer__about-item a:hover {
    color: $white;
}

.top-footer__contacts {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 30px;
}

.top-footer__numbers {
  display: flex;
  flex-direction: column;
}

.top-footer__messangers {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.top-footer__accept-block {
  display: flex;
  flex-direction: column;
}

.top-footer__contacts-number {
    margin-bottom: 5px;
    font-size: 18px;
    color: $brandColor;
    transition: color 300ms ease;
}

.top-footer__contacts-number:hover {
    color: $white;
}

.top-footer__contacts-mail {
    position: relative;
    margin-bottom: 10px;
    font-size: 18px;
    color: $white;
}

.top-footer__contacts-mail::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: $darkerBrandColor;
    opacity: 0;
    transition: opacity 300ms ease;
}

.top-footer__contacts-mail:hover::after {
    opacity: 1;
}

.top-footer__callback {
    margin-bottom: 15px;
    padding: 3px 30px;
    border-radius: 2px;
    font-size: 14px;
    background-color: $brandColor;
    transition-property: background-color, box-shadow;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.top-footer__callback:hover {
    background-color: $darkerBrandColor;
    box-shadow: 0 0 5px $grey;
}

.top-footer__social {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
}

.top-footer__social-list {
    display: flex;
    margin-bottom: 10px;
}

.top-footer__social-item:not(:last-child) {
    margin-right: 20px;
}

.top-footer__social-svg {
    fill: $brandColor;
    transition: fill 300ms ease;
}

.top-footer__accept-title {
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 500;
    color: $white;
}

.top-footer__accept-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.top-footer__accept-item:not(:last-child) {
    margin-right: 10px;
}

.bottom-footer__copyright {
    margin-bottom: 15px;
    font-size: 12px;
    color: $white;
}

.bottom-footer__public {
    font-size: 12px;
    color: $white;
}

.top-footer__contacts-title {
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 500;
    color: $white;
}

@media (max-width: 1024px) {

.top-footer {
    flex-wrap: wrap;
    justify-content: center;
}

.top-footer__info {
    width: 100%;
    align-items: center;
    text-align: center;
    margin-right: 0;
    margin-bottom: 15px;
}

.top-footer__info-about {
    flex-direction: column;
}

.top-footer__info-about .logo-link {
    margin-right: 0;
    margin-bottom: 15px;
}

.top-footer__catalog {
    width: 30%;
    margin-bottom: 15px;
}

.top-footer__services {
    width: 30%;
    align-items: flex-end;
    margin-right: 0;
    margin-bottom: 15px;
}

.top-footer__services-list {
    text-align: right;
    align-items: flex-end;
}

.top-footer__about {
    width: 100%;
    text-align: center;
    margin-right: 0;
    margin-bottom: 25px;
}

.top-footer__contacts {
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.top-footer__numbers {
  margin-right: 80px;
}

.top-footer__accept-block {
  width: 100%;
  align-items: center;
}

}

@media(max-width: 500px) {

.top-footer__catalog {
    align-items: center;
    text-align: center;
    width: 100%;
    margin-right: 0;
    margin-bottom: 25px;
}

.top-footer__services {
    align-items: center;
    text-align: center;
    width: 100%;
    margin-bottom: 25px;
}

.top-footer__services-list {
    text-align: center;
    align-items: center;
}

.top-footer__about {
    width: 100%;
    text-align: center;
    margin-right: 0;
    margin-bottom: 25px;
}

.top-footer__contacts {
    flex-direction: column;
}

.top-footer__numbers {
  align-items: center;
  margin-right: 0;
  margin-bottom: 10px;
}

.top-footer__messangers {
  align-items: center;
  margin-bottom: 10px;
}

.bottom-footer__copyright {
    margin-bottom: 5px;
}

}
</style>
