

module.exports = async (event, res) => {
    const { request, session, version } = event;

    res.end(JSON.stringify({
        version,
        session,
        response: {
            text: "boop",
            end_session: false,
        }
    }))
};
