export function formatPrice(price: number, currency = 'USD', locale = 'fr-FR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    currency,
  }).format(price);
}

export function formatPriceWithOutSymbol(price: number, locale = 'fr-FR') {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
    useGrouping: true,
  }).format(price);
}

export function formatCurrencyToParts(
  value?: number,
  locale = 'en-US',
  currency = 'USD',
): {
  position: 'left' | 'right';
  symbol: string;
  value: string;
} {
  if (typeof value !== 'number') {
    return { position: 'right', symbol: '', value: '' };
  }

  const symbolFormatter = Intl.NumberFormat(locale, {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    currency,
  });

  const valueFormattedToParts = symbolFormatter.formatToParts(value);

  const symbolIndex = valueFormattedToParts.findIndex(
    (part) => part.type === 'currency',
  );

  const position = symbolIndex > 0 ? 'right' : 'left';

  let valueFormatted = '';
  let symbolFormatted = '';

  for (let i = 0; i < valueFormattedToParts.length; i++) {
    const part = valueFormattedToParts[i];
    const previousPart = valueFormattedToParts[i - 1];
    const nextPart = valueFormattedToParts[i + 1];

    if (part.type === 'currency') {
      symbolFormatted += part.value;
    } else if (
      part.type === 'literal' &&
      (previousPart.type === 'currency' || nextPart.type === 'currency')
    ) {
      symbolFormatted += part.value;
    } else {
      valueFormatted += part.value;
    }
  }

  return {
    symbol: symbolFormatted,
    position,
    value: valueFormatted,
  };
}
