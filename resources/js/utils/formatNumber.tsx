export const formatNumber = (number: number) => {
    return new Intl.NumberFormat("es-CO").format(number);
};
