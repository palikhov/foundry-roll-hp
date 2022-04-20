function onPreCreateToken(tokenDocument, data, options, userId) {
  const actor = tokenDocument.actor;

  if (actor) {
    const formula = actor.data.data.attributes.hp.formula;
    if (!formula) return;
    let hp = new Roll(formula).roll({ async: false }).total;

    hp < 1 ? (hp = 1) : null;

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
