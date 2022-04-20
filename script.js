function onPreCreateToken(tokenDocument, data, options, userId) {
  const actor = tokenDocument.actor;

  if (actor) {
    const formula = actor.data.data.attributes.hp.formula;
    if (!formula) return;
    const hp = new Roll(formula).roll({ async: false }).total;

    tokenDocument.data.update({
      actorData: {
        data: {
          attributes: {
            hp: {
              max: hp,
              value: hp,
            },
          },
        },
      },
    });
  }
}

Hooks.on("preCreateToken", onPreCreateToken);
