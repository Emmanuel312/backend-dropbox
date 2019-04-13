org 0x7c00
jmp 0x0000:start

impar: db 'impar', 0
par: db 'par', 0

printstr:
	lodsb ; carrega oq si esta apontando para al
	cmp al,0
	je fim_string
	mov ah,0xe
	int 10h
	jmp printstr
	fim_string:
		ret	
scan:
	mov ah,0
	int 16h
	ret
teste: ; caso n%2 == 0 -> par, senao impar
	mov bl,2
	div bl ; al = ax/bl , ah = ax%bl
	cmp ah,0
	je p
	mov si,impar
	jmp fim_teste

	p:
		mov si,par
	fim_teste:	
		ret

start:
	call scan
	sub al,'0' 
	movzx ax,al
	call teste
	call printstr
	
fim:
	jmp $
times 510-($-$$) db 0
dw 0xaa55