export function clickCounter(limit = 6) {
  let count = 0;
  return (btn) => {
    if (count < limit) {
      count++;
      const remaining = limit - count;
      btn.textContent = `Клік ${count} (залишилось ${remaining})`;
    } else {
      btn.textContent = `Ліміт ${limit} вичерпано`;
      btn.disabled = true;
    }
  };
}
