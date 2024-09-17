export interface Category {
    optionTitle: string;
    optionValue: string;
    subCategories?: Category[];
  }