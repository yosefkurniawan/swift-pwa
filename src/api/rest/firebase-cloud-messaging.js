/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
module.exports = (req, res) => {
    const { token } = req.body;
    const topic = 'flash_sale';
    const keyserver = 'key=AAAA766Up6c:APA91bH2dV9Nz5ox_jlhoh8BocmCnbfMjs0zjnamaPd1WsQgGn_VyQdVLnfBH5F01oJ592MZ4p-txdObjRl8C_dTr0zvhJWIBBT73X_4G2q7w0Jj-EOHSebgn10jvjuqskd2ZGZpbc1n';

    if (req.session.fcm_token !== token) {
        fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': 0,
                Authorization: keyserver,
            },
        })
            .then((data) => {
                req.session.fcm_token = token;
                res.status(200).json({
                    status: 200,
                    message: 'success subscribe token',
                });
            })
            .catch((err) => res.status(500).json(err));
    } else {
        res.json({
            status: 200,
            message: 'subscribe token',
        });
    }
};
