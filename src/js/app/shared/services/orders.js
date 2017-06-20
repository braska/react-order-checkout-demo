// eslint-disable-next-line
export const process = (data) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    console.log(data);
    setTimeout(() => {
      const error = Math.random() < 0.5;
      if (error) {
        resolve({
          data: {
            id: 1231231,
            email: data.billingInfo.email,
            estimated_date: new Date().toISOString(),
          },
          status: 200,
        });
      } else {
        reject({
          status: 500,
        });
      }
    }, 3000);
  });
};
