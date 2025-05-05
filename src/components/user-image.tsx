
const userImage = ({ url, name, gender }: { url: string, name: string, gender: string }) => {
    return (
        <div className="w-40">
            <div className="flex items-center gap-2">
                <img
                    src={url ? url : gender === 'male' ? '/user.png' : '/female_user.png'}
                    alt="user"
                    className="object-cover w-9 h-9 rounded-full border-2 dark:border-border" />

                <p>{name}</p>
            </div>
        </div>
    )
}

export default userImage