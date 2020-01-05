

export async function handler(event, res) {
    const { request, session, version } = event

    return {
        version,
        session,
        response: {
            text: 'boop',
            end_session: false,
        }
    }
}
