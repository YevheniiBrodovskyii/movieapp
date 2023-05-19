import { useRouter } from 'next/router'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

const CheckRole: FC<TypeComponentAuthFields> = ({
	children,
	Component: { isOnlyAdmin, isOnlyUser },
}) => {
	const { user } = useAuth()

	const router = useRouter()

	// Komponent pomocniczy do renderowania komponentów potomnych
	const Children = () => <>{children}</>

	// Sprawdzanie warunków wyświetlania komponentu
	if (!isOnlyAdmin && !isOnlyUser) return <Children />

	// Sprawdzanie roli użytkownika i renderowanie komponentów w zależności od warunków
	if (user?.isAdmin) return <Children />

	if (isOnlyAdmin) {
		// Przekierowanie na stronę 404, jeśli wymagany jest tylko dostęp administratora
		router.pathname !== '/404' && router.replace('/404')
		return null
	}

	const isUser = user && !user.isAdmin

	if (isUser && isOnlyUser) return <Children />
	else {
		// Przekierowanie na stronę autoryzacji, jeśli wymagany jest tylko dostęp użytkownika
		router.pathname !== '/auth' && router.replace('/auth')
		return null
	}
}

export default CheckRole
