<template>
  <header id="header">
    <div class="top-header">
      <div class="container top-header-container">
        <ul class="top-header__list">
          <li class="top-header__list-item">
            <a href="/" class="top-header__list-link">О компании</a>
          </li>
          <li class="top-header__list-item">
            <a href="/" class="top-header__list-link">Доставка</a>
          </li>
          <li class="top-header__list-item">
            <a href="#" class="top-header__list-link">Прайс лист</a>
          </li>
        </ul>
        <div class="top-header__regions">
          <a href="#" class="top-header__regions-link">
            Москва
          </a>
          <svg class="top-header__svg" height="20px" width="20px"><use xlink:href="@/assets/images/sprites.svg#map-mark" /></svg>
        </div>
        <div class="top-header__authorization">
          <div
            v-if="$auth.loggedIn"
            class="top-header__account"
          >
            <span
              class="authorization__account"
            >
              Личный кабинет
              <svg>
                <use xlink:href="@/assets/images/sprites.svg#arrow-popup" />
              </svg>
            </span>
            <div class="authorization__account-popup">
              <NuxtLink to="/account">
                Профиль
                <svg>
                  <use xlink:href="@/assets/images/sprites.svg#account" />
                </svg>
              </NuxtLink>
              <a href="#" @click.prevent="logout">
                Выйти
                <svg>
                  <use xlink:href="@/assets/images/sprites.svg#logout" />
                </svg>
              </a>
            </div>
          </div>
          <NuxtLink
            v-if="!$auth.loggedIn"
            to="/login"
            class="authorization__login"
          >
            Вход
          </NuxtLink>
          <NuxtLink
            v-if="!$auth.loggedIn"
            to="/registration"
            class="authorization__signup"
          >
            Регистрация
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="bottom-header">
      <div class="container bottom-header-container">
        <NuxtLink to="/" href="/" class="logo-link" />
        <form class="bottom-header__search-form" action="#">
          <input class="bottom-header__search-input" type="text" placeholder="Поиск по сайту">
          <button class="bottom-header__search-btn">
            Найти
          </button>
        </form>
        <div class="bottom-header__call">
          <span class="bottom-header__time">С 8:00 до 20:00 ежедневно</span>
          <a href="tel:+74957317171" class="bottom-header__phone">+1 (222) 333-44-55</a>
          <a href="#" class="bottom-header__callback">Обратный звонок</a>
        </div>
        <p class="bottom-header__address">
          Lorem ipsum dolor sit amet consectetur
        </p>
        <div class="bottom-header__social">
          <ul class="bottom-header__social-list">
            <li class="bottom-header__social-item">
              <a href="#" class="bottom-header__social-link">
                <svg class="bottom-header__social-svg telegram-color" width="35px" height="35px">
                  <use xlink:href="@/assets/images/sprites.svg#telegram" />
                </svg>
              </a>
            </li>
            <li class="bottom-header__social-item">
              <a href="#" class="bottom-header__social-link">
                <svg class="bottom-header__social-svg whatsapp-color" width="35px" height="35px">
                  <use xlink:href="@/assets/images/sprites.svg#whatsapp" />
                </svg>
              </a>
            </li>
            <li class="bottom-header__social-item">
              <a href="#" class="bottom-header__social-link">
                <svg class="bottom-header__social-svg viber-color" width="35px" height="35px">
                  <use xlink:href="@/assets/images/sprites.svg#viber" />
                </svg>
              </a>
            </li>
          </ul>
          <a
            class="bottom-header__social-mail"
            href="mailto:mail@mail.com"
            @click.prevent="notificate({
              text: 'Test notification',
              title: 'Title'
            })"
          >
            mail@mail.com
          </a>
        </div>
      </div>
    </div>
    <nav id="nav" class="header-nav">
      <HeaderCatalog
        :catalog-opened="catalogOpened"
      />
      <div class="container header-nav-container">
        <a
          id="menu"
          href="#"
          class="header-nav__menu"
          @click.prevent="toggleMenu(!menuOpened)"
        >
          <span class="header-nav__menu-burger" />
          Меню
        </a>
        <button
          id="menu-close"
          class="header-nav__menu-close"
          :class="{'nav-list_opened': menuOpened}"
          @click.prevent="toggleMenu(false)"
        />
        <div class="header-nav__catalog-container">
          <a
            id="catalog-btn"
            href="#"
            class="header-nav__catalog"
            :class="{
              '_btn-catalog_opened': catalogOpened,
              'nav-list_opened': menuOpened
            }"
            @click.prevent="toggleCatalog(!catalogOpened)"
          >
            <span class="header-nav__catalog-burger" />
            Каталог
          </a>
        </div>
        <ul
          class="header-nav__list"
          :class="{'nav-list_opened': menuOpened}"
        >
          <li class="header-nav__list-item">
            <NuxtLink to="/" href="#" class="header-nav__item-link">
              Главная
            </NuxtLink>
          </li>
          <li class="header-nav__list-item">
            <a href="/" class="header-nav__item-link">
              Контакты
            </a>
          </li>
          <li class="header-nav__list-item">
            <a href="/" class="header-nav__item-link">
              Статьи
            </a>
          </li>
          <li class="header-nav__list-item">
            <a href="/" class="header-nav__item-link">
              Услуги и сервис
            </a>
          </li>
          <li class="header-nav__list-item">
            <a href="/" class="header-nav__item-link">
              Информация
            </a>
          </li>
        </ul>
        <div class="header-nav__cart-block">
          <div class="header-nav__compare-box">
            <NuxtLink
              v-tooltip="{ content: 'Сравнение товаров' }"
              to="/compare"
              class="header-nav__compare"
            >
              <svg class="header-nav__svg" height="20px" width="20px">
                <use xlink:href="@/assets/images/sprites.svg#compare" />
              </svg>
            </NuxtLink>
            <span
              v-show="compareAmount"
              class="top-amount"
            >
              {{ compareAmount }}
            </span>
          </div>
          <div class="header-nav__favorite-box">
            <NuxtLink
              v-tooltip="{ content: 'Избранное' }"
              to="/favorite"
              href="#"
              class="header-nav__favorite"
            >
              <svg class="header-nav__svg" height="20px" width="20px">
                <use xlink:href="@/assets/images/sprites.svg#favorite" />
              </svg>
            </NuxtLink>
            <span
              v-show="favoriteAmount"
              class="top-amount"
            >
              {{ favoriteAmount }}
            </span>
          </div>
          <div
            v-tooltip="{ content: 'Корзина' }"
            class="header-nav__cart-box"
          >
            <NuxtLink
              to="/cart"
              class="header-nav__cart"
            >
              <svg class="header-nav__svg" height="20px" width="20px">
                <use xlink:href="@/assets/images/sprites.svg#cart" />
              </svg>
            </NuxtLink>
            <span class="header-nav__amount">{{ cartAmount }}</span>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import eventBus from '~/eventBus'
import initTouchMenu from '~/helpers/headerTouchMenu'

export default {
  name: 'HeaderComponent',
  props: {
    catalogOpened: {
      type: Boolean,
      default: false
    },
    menuOpened: {
      type: Boolean,
      default: false
    },
    logoutLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      cartTotalAmount: 'cart/cartTotalAmount',
      compareProducts: 'compareIndicator/compareProducts',
      favoriteAmount: 'favorite/favoriteProductsAmount'
    }),

    cartAmount () {
      return this.cartTotalAmount
    },
    compareAmount () {
      return this.compareProducts.length > 0 ? this.compareProducts.length : null
    }
  },
  mounted () {
    // Прилипание шапки к верху экрана при прокрутке

    const nav = this.$el.querySelector('#nav')
    const navTop = nav.offsetTop
    const bottomHeader = this.$el.querySelector('.bottom-header')

    function navStick () {
      const scroll = window.scrollY

      nav.classList.toggle('nav_sticky', scroll >= navTop)

      scroll >= navTop
        ? bottomHeader.style.marginBottom = `${nav.offsetHeight}px`
        : bottomHeader.style.marginBottom = ''
    }

    window.addEventListener('scroll', navStick)

    // Мобильное тач меню

    const context = this

    const menu = this.$el.querySelector('.header-nav__list')
    const catalogBtn = this.$el.querySelector('#catalog-btn')
    const close = this.$el.querySelector('#menu-close')

    initTouchMenu(context, {
      menu,
      catalogBtn,
      close
    })
  },
  methods: {
    ...mapMutations({
      updateUserId: 'user/updateUserId',
      updateUserToken: 'user/updateUserToken',
      cartReset: 'cart/cartReset',
      compareReset: 'compareIndicator/compareReset',
      favoriteReset: 'favorite/favoriteReset'
    }),

    toggleCatalog (value) {
      eventBus.$emit('toggleCatalog', value)
    },
    toggleMenu (value) {
      eventBus.$emit('toggleMenu', value)
    },
    logout () {
      eventBus.$emit('logoutLoading', true)

      this.$auth.logout()
        .then(() => {
          this.$router.push('/login')
        })
        .finally(() => {
          eventBus.$emit('logoutLoading', false)

          this.cartReset()
          this.compareReset()
          this.favoriteReset()

          localStorage.removeItem('token')
          localStorage.removeItem('cartId')

          this.updateUserToken(null)
          this.updateUserId(null)
        })
    },
    notificate (data) {
      eventBus.$emit('notify', data)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

.nav_sticky {
    position: fixed !important;
    top: 0;
    width: 100%;
    box-shadow: 0 0 10px $grey;
    border-color: $lightGrey;
}

.top-header {
    border-bottom: 3px solid $almostWhite;
    background-color: $lightGrey;
}

.top-header-container {
    display: flex;
    align-items: center;
    align-content: center;
    width: 100%;
    padding-top: 17px;
    padding-bottom: 17px;
}

.top-header__list {
    display: flex;
    margin-right: auto;
}

.top-header__list-item:not(:last-child) {
    margin-right: 45px;
}

.top-header__list-link {
    position: relative;
}

.top-header__list-link::after {
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

.top-header__list-link:hover::after {
    opacity: 1;
}

.top-header__authorization {
    font-weight: 500;
}

.top-header__account {
  position: relative;
}

.authorization__account {
  position: relative;
  padding-right: 30px;
  font-weight: 500;
  cursor: pointer;
}

.authorization__account svg {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  width: 10px;
  height: 10px;
  fill: $black;
}

.top-header__authorization:hover .authorization__account svg {
  fill: $brandColor;
}

.authorization__account::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: $brandColor;
  box-shadow: 0 3px 5px $brandColor;
  border-radius: 2px;
  opacity: 0;
  transform-origin: center center;
  transform: scaleX(0);
  transition-property: opacity, transform;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.top-header__account:hover .authorization__account::after {
  opacity: 1;
  transform: scaleX(1);
}

.top-header__account:hover .authorization__account-popup {
  opacity: 1;
  visibility: visible;
  transform: translateY(4px);
}

.authorization__account-popup {
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  padding: 10px 5px;
  border: 1px solid $darkerBrandColor;
  border-top: none;
  border-bottom-left-radius: 5px;
  background-color: rgba($lightGrey, 0.8);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition-property: opacity, visibility, transform;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.authorization__account-popup a {
  position: relative;
  display: inline-block;
  padding-right: 35px;
  transition-property: color;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.authorization__account-popup a:hover {
  color: $purple;
}

.authorization__account-popup a:not(:last-child) {
  margin-bottom: 10px;
}

.top-header__account svg {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  fill: $black;
  transition-property: fill;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.top-header__account a:hover svg {
  fill: $purple;
}

.authorization__login {
    margin-right: 10px;
    padding: 3px 15px 4px;
    border: 2px solid $lightGrey;
    transition-property: border-color, color, box-shadow;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.authorization__login:hover {
    box-shadow: -3px 3px 10px $grey;
}

.authorization__signup {
    padding: 5px 17px 6px;
    border-radius: 2px;
    background-color: $brandColor;
    transition-property: background-color, box-shadow;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.authorization__signup:hover {
    background-color: $darkerBrandColor;
    box-shadow: -3px 3px 10px $grey;
}

.top-header__regions {
    position: relative;
    margin-right: 30px;
}

.top-header__regions-link {
    padding: 0 20px;
}

.top-header__regions-link::after {
    content: '';
    position: absolute;
    bottom: -20%;
    right: 0;
    border: 7px solid transparent;
    border-left-width: 6px;
    border-right-width: 6px;
    border-top-color: $black;
    transition: transform 300ms ease;
}

.top-header__regions-link:hover::after {
    transform: translateY(20%);
}

.top-header__svg {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: fill 300ms ease;
}

.top-header__regions-link:hover + .top-header__svg {
    fill: $darkerBrandColor;
}

.bottom-header-container {
    display: flex;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 17px;
}

.bottom-header__search-form {
    display: flex;
    margin-right: 50px;
}

.bottom-header__search-input {
    width: 300px;
    height: 36px;
    border-radius: 2px 0 0 2px;
    transition: border-color 300ms ease;
}

.bottom-header__search-input:hover,
.bottom-header__search-input:focus {
    border-color: $darkerBrandColor;
}

.bottom-header__search-input::placeholder {
    color: $grey;
}

.bottom-header__search-btn {
    height: 36px;
    padding: 0 12px;
    font-weight: 500;
    border: none;
    border-radius: 0 2px 2px 0;
    background-color: $brandColor;
    transition: background-color 300ms ease;
}

.bottom-header__search-btn:hover {
    background-color: $darkerBrandColor;
}

.bottom-header__call {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 175px;
    margin-right: 50px;
}

.bottom-header__time {
    margin-bottom: 7px;
    font-size: 14px;
}

.bottom-header__phone {
    position: relative;
    margin-bottom: 7px;
    font-weight: 500;
    transition: color 300ms ease;
}

.bottom-header__phone:hover {
    color: $darkerBrandColor;
}

.bottom-header__callback {
    padding: 3px 30px;
    border-radius: 2px;
    font-size: 14px;
    background-color: $brandColor;
    transition-property: background-color, box-shadow;
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.bottom-header__callback:hover {
    background-color: $darkerBrandColor;
    box-shadow: 0 0 5px $grey;
}

.bottom-header__address {
    text-align: center;
    margin-right: 50px;
}

.bottom-header__social {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.bottom-header__social-list {
    display: flex;
    margin-bottom: 10px;
}

.bottom-header__social-item:not(:last-child) {
    margin-right: 20px;
}

.bottom-header__social-svg {
    fill: $brandColor;
    transition: fill 300ms ease;
}

.telegram-color:hover {
    fill: #0088cc;
}

.whatsapp-color:hover {
    fill: #25D366;
}

.viber-color:hover {
    fill: #8f5db7;
}

.bottom-header__social-mail {
    position: relative;
}

.bottom-header__social-mail::after {
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

.bottom-header__social-mail:hover::after {
    opacity: 1;
}

.header-nav {
    position: relative;
    border-top: 3px solid $almostWhite;
    border-bottom: 3px solid $almostWhite;
    background-color: $lightGrey;
    transition-property: box-shadow;
    transition-duration: 300ms;
    transition-timing-function: ease;
    z-index: 1000;
}

.header-nav-container {
    position: relative;
    display: flex;
    align-items: stretch;
}

.header-nav__catalog-container {
    margin-right: 30px;
}

.header-nav__catalog {
    display: block;
    position: relative;
    padding: 10px 15px 10px 50px;
    font-size: 18px;
    font-weight: 500;
    background-color: $brandColor;
    overflow: hidden;
}

.header-nav__catalog:hover {
    background-color: $darkerBrandColor;
}

.header-nav__catalog-burger {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    width: 25px;
    height: 2px;
    background-color: $black;
    transition-property: background-color, transform;
    transition-duration: 300ms;
    transition-timing-function: ease;
    pointer-events: none;
}

.header-nav__catalog-burger::before,
.header-nav__catalog-burger::after {
    content: '';
    position: absolute;
    left: 0;
    width: 25px;
    height: 2px;
    background-color: $black;
    transition: all 300ms ease;
}

.header-nav__catalog-burger::before {
    top: 6px;
}

.header-nav__catalog-burger::after {
    top: -6px;
}

.header-nav__catalog:hover .header-nav__catalog-burger {
    background-color: $darkerBrandColor;
}

.header-nav__catalog:hover .header-nav__catalog-burger::before {
    transform: rotate(-30deg);
}

.header-nav__catalog:hover .header-nav__catalog-burger::after {
    transform: rotate(30deg);
}

.header-nav__list {
    display: flex;
    margin-right: auto;
}

.header-nav__list::before {
    content: '';
    display: none;
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translate(0, -50%);
    border: 2px solid $grey;
    border-radius: 10px;
    width: 2px;
    height: 40px;
    background-color: $lightGrey;
}

.header-nav__list-item {
    display: flex;
    align-items: stretch;
}

.header-nav__list-item:not(:last-child) {
    border-right-width: 2px;
    border-right-style: solid;
    border-right-color: $almostWhite;
}

.header-nav__item-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 30px;
    overflow: hidden;
    transition: text-shadow 300ms ease;
    z-index: 0;
}

.header-nav__item-link::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $brandColor;
    transform: translateY(-100%);
    transition: transform 300ms ease;
    z-index: -1;
}

.header-nav__item-link:hover::after {
    transform: translateY(0);
}

.header-nav__cart-block {
    display: flex;
    align-items: center;
}

.header-nav__svg {
    transition: fill 300ms ease;
}

.header-nav__svg:hover {
    fill: $darkerBrandColor;
}

.header-nav__compare-box {
  position: relative;
  margin-right: 30px;
}

.header-nav__favorite-box {
  position: relative;
  margin-right: 20px;
}

.header-nav__cart-box {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: $brandColor;
    transition: background-color 300ms ease;
}

.header-nav__cart-box:hover {
    background-color: $black;
}

.header-nav__cart-box:hover .header-nav__cart .header-nav__svg {
    fill: $brandColor;
}

.header-nav__cart-box:hover .header-nav__amount {
    color: $brandColor;
}

.header-nav__cart {
    margin-right: 8px;
}

.header-nav__cart::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.header-nav__amount {
    font-size: 18px;
    font-weight: 500;
    color: $black;
    pointer-events: none;
    transition: color 300ms ease;
}

.header-nav__menu {
    display: none;
    position: relative;
    padding: 10px 15px 10px 50px;
    margin-right: auto;
    font-weight: 500;
    background-color: $brandColor;
    overflow: hidden;
    transition: background-color 300ms ease;
}

.header-nav__menu-burger {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    width: 20px;
    height: 2px;
    background-color: $black;
    transition: background-color 300ms ease;
}

.header-nav__menu-burger::before,
.header-nav__menu-burger::after {
    content: '';
    position: absolute;
    left: 0;
    width: 25px;
    height: 2px;
    background-color: $black;
    transition: all 300ms ease;
}

.header-nav__menu-burger::before {
    top: 6px;
}

.header-nav__menu-burger::after {
    top: -6px;
}

.header-nav__menu-close {
    position: fixed;
    top: 10px;
    left: 185px;
    width: 35px;
    height: 35px;
    border: 2px solid $black;
    border-radius: 2px;
    background-color: transparent;
    z-index: 50;
    opacity: 0;
    pointer-events: none;
    display: none;
    transition-property: opacity, transform;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
}

.header-nav__menu-close::before,
.header-nav__menu-close::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 2px;
    background-color: $black;
}

.header-nav__menu-close::before {
    transform: translate(-50%, -50%) rotate(45deg);
}

.header-nav__menu-close::after {
    transform: translate(-50%, -50%) rotate(-45deg);
}

@media (max-width: 1200px) {

    .bottom-header__search-form,
    .bottom-header__call,
    .bottom-header__address {
        margin-right: 30px;
    }

    .bottom-header__search-input {
        width: 200px;
    }

    .header-nav__item-link {
        padding: 0 20px;
    }

}

@media (max-width: 1024px) {

    .bottom-header-container {
        flex-direction: column;
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .logo-link,
    .bottom-header__search-form,
    .bottom-header__call,
    .bottom-header__address {
        margin-right: 0;
    }

    .logo-link {
        margin-bottom: 20px;
    }

    .bottom-header__search-form {
        width: 100%;
        justify-content: center;
    }

    .bottom-header__search-input {
        width: 80%;
        z-index: 10;
    }

    .bottom-header__call {
        display: none;
    }

    .bottom-header__time {
        font-size: 12px;
    }

    .bottom-header__phone {
        font-size: 14px;
    }

    .bottom-header__callback {
        padding: 3px 20px;
        font-size: 12px;
    }

    .bottom-header__address {
        display: none;
    }

    .bottom-header__social {
        display: none;
    }

    .bottom-header__social-list {
        margin-bottom: 0;
        order: 1;
    }

    .bottom-header__social-mail {
        margin-bottom: 5px;
        font-size: 14px;
        order: 0;
    }

    .header-nav-container {
        justify-content: flex-start;
    }

    .header-nav__catalog-container {
        margin-right: 0;
    }

    .header-nav__catalog {
        position: fixed;
        top: 25px;
        left: 25px;
        z-index: 50;
        opacity: 0;
        pointer-events: none;
        transform: translateX(-300%);
        transition-property: transform, opacity, background-color;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
    }

    .header-nav__list {
        position: fixed;
        top: 0;
        left: 0;
        flex-direction: column;
        margin-right: 0;
        padding: 80px 75px 20px 25px;
        background-color: $white;
        border-right: 2px solid $brandColor;
        border-bottom: 3px solid $brandColor;
        z-index: 40;
        opacity: 0;
        pointer-events: none;
        transform: translateX(-100%);
        transition-property: transform, opacity;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
    }

    .header-nav__list::before {
        display: block;
    }

    // .header-nav__list::after {
    //     display: block;
    // }

    .header-nav__list-item:not(:last-child) {
        border-right-width: 0;
        border-right-style: unset;
        border-right-color: unset;
    }

    .header-nav__list-item {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 2px solid $lightGrey;
    }

    .header-nav__item-link {
        padding: 0;
        font-size: 20px;
    }

    .header-nav__menu {
        display: block;
    }

    .header-nav__menu-close {
        display: block;
        transform: translateX(-250px);
    }

    .nav-list_opened {
        transform: translateX(0);
        opacity: 1;
        pointer-events: all;
    }

    .header-nav-container {
        position: unset;
    }

    .top-header__account:hover .authorization__account-popup {
      transform: translateY(0);
    }

}

@media(max-width: 768px) {

    .top-header-container {
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 5px;
        padding-bottom: 10px;
    }

    .top-header__list-item:not(:last-child) {
        margin-right: 20px;
    }

    .top-header__list {
        justify-content: center;
        position: relative;
        width: 100%;
        margin-right: 0;
        margin-bottom: 20px;
        font-size: 14px;
    }

    .top-header__regions {
        display: flex;
        justify-content: center;
        width: 100%;
        order: 2;
        margin-right: 0;
    }

    .top-header__regions-link {
        padding-right: 0;
    }

    .top-header__regions-link::after {
        content: unset;
    }

    .header-nav__compare-box {
      margin-right: 15px;
    }

    .header-nav__favorite-box {
      margin-right: 15px;
    }

    .top-header__svg {
        height: 16px !important;
        width: 16px !important;
        position: relative;
    }

    .top-header__authorization {
        margin-bottom: 20px;
    }

    .authorization__account {
      display: none;
    }

    .authorization__account-popup {
      position: relative;
      flex-direction: row;
      padding: 0;
      border: none;
      opacity: 1;
      visibility: visible;
      background-color: transparent;
      transform: translateY(0);
    }

    .authorization__account-popup a:not(:last-child) {
      margin-bottom: 0;
      margin-right: 10px;
    }

}
</style>
