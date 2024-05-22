export async function getQuestions(options = {}) {
  try {
    const res = await fetch(buildUrl("questions"), options);

    // Delay get question execution to simulate real data fetch
    await delay(1000);

    if (!res.ok) throw Error("Fail during fetching questions");

    return await res.json();
  } catch (err) {
    throw new Error(err);
  }
}

export async function checkAnswer(questionId) {
  try {
    const res = await fetch(buildUrl("answers"));

    // Delay check answer execution to simulate real data fetch
    await delay(1000);

    if (!res.ok) throw Error("Fail during fetching asnwers");

    const data = await res.json();

    const answer = data.filter((answer) => answer.id === questionId);
    return answer.length ? answer.at(0) : null;
  } catch (err) {
    throw new Error(err);
  }
}

function buildUrl(request) {
  return `${document.location.origin.replace(
    document.location.port,
    process.env.REACT_APP_SERVER_PORT
  )}/${request}`;
}

async function delay(ms) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
