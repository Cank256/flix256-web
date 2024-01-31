import smoothscroll from 'smoothscroll-polyfill';


export default class Carousel {
  elementWidth: number = 0;
  carouselWidth: number = 0;
  visibleWidth: number = 0;
  maximumPosition: number = 0;
  unusableVisibleWidth: number = 0;
  disableLeftButton: boolean = true;
  disableRightButton: boolean = false;

  mounted() {
    smoothscroll.polyfill();
    window.addEventListener('resize', this.resizeEvent);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeEvent);
  }



  $refs!: {
    carouselElement: HTMLElement;
  };

  constructor() {
    this.$refs = {
      carouselElement: document.createElement('div'),
    };
  }

  calculateState(numberOfItems: number) {
    let unusableVisibleWidth = 72;
    const firstChild = this.$refs.carouselElement.firstChild as HTMLElement;
    const elementWidth = firstChild ? firstChild.getBoundingClientRect().width : 0;
    const carouselWidth = numberOfItems * elementWidth;
    const maximumPosition = this.$refs.carouselElement.scrollWidth;

    if (window.innerWidth >= 1200) {
      unusableVisibleWidth = 92;
    }

    const visibleWidth = this.$refs.carouselElement.offsetWidth - unusableVisibleWidth;

    this.unusableVisibleWidth = unusableVisibleWidth;
    this.elementWidth = elementWidth;
    this.carouselWidth = carouselWidth;
    this.visibleWidth = visibleWidth;
    this.maximumPosition = maximumPosition;
    this.disableLeftButton = !this.$refs.carouselElement.scrollLeft;
    this.disableRightButton = visibleWidth >= carouselWidth;
  }

  moveTo(width: number) {
    this.$refs.carouselElement.scrollTo({
      left: width,
      behavior: 'smooth',
    });
  }

  moveToClickEvent(direction: 'left' | 'right') {
    const invisible =
      this.$refs.carouselElement.scrollLeft + (direction === 'left' ? -this.visibleWidth + 1 : this.visibleWidth);
    const remainder = invisible - (invisible % this.elementWidth);

    this.moveTo(remainder);
  }

  scrollEvent() {
    const scrollLeft = this.$refs.carouselElement.scrollLeft;
    const end = this.maximumPosition - this.visibleWidth - this.elementWidth;

    this.disableLeftButton = scrollLeft < 3;
    this.disableRightButton = scrollLeft > end;
  }

  resizeEvent() {
    this.calculateState(6);
  }
}
