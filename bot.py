import asyncio
import logging
import os
import random
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.utils.keyboard import InlineKeyboardBuilder

BOT_TOKEN = os.getenv("BOT_TOKEN")
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

def is_valid(grid, row, col, num):
    if num in grid[row]: return False
    if num in [grid[i][col] for i in range(9)]: return False
    br, bc = (row//3)*3, (col//3)*3
    for i in range(3):
        for j in range(3):
            if grid[br+i][bc+j] == num: return False
    return True

def solve(grid):
    nums = list(range(1,10))
    random.shuffle(nums)
    for r in range(9):
        for c in range(9):
            if grid[r][c] == 0:
                for n in nums:
                    if is_valid(grid, r, c, n):
                        grid[r][c] = n
                        if solve(grid): return True
                        grid[r][c] = 0
                return False
    return True

def generate_solved():
    grid = [[0]*9 for _ in range(9)]
    solve(grid)
    return grid

def make_puzzle(solved, removes=40):
    puzzle = [row[:] for row in solved]
    positions = [(r,c) for r in range(9) for c in range(9)]
    random.shuffle(positions)
    for r,c in positions[:removes]:
        puzzle[r][c] = 0
    return puzzle

games = {}

def board_text(chat_id):
    game = games[chat_id]
    puzzle = game['puzzle']
    solved = game['solved']
    selected = game.get('selected', None)
    lines = []
    for r in range(9):
        row = ""
        for c in range(9):
            val = puzzle[r][c]
            orig = game['original'][r][c]
            idx = r*9+c
            if orig != 0:
                ch = str(val)
            elif val == 0:
                ch = "·"
            elif val == solved[r][c]:
                ch = str(val)
            else:
                ch = "✗"
            if selected == idx and orig == 0:
                ch = f"[{ch}]"
            row += ch + " "
            if c == 2 or c == 5:
                row += "| "
        lines.append(row)
        if r == 2 or r == 5:
            lines.append("------+-------+------")
    return "```\n" + "\n".join(lines) + "\n```"

def numpad_keyboard(chat_id):
    builder = InlineKeyboardBuilder()
    for i in range(1, 10):
        builder.button(text=str(i), callback_data=f"num_{i}")
    builder.button(text="✕ O'chirish", callback_data="num_0")
    builder.adjust(3, 3, 3, 1)
    return builder.as_markup()

@dp.message(Command("start"))
async def start(message: types.Message):
    await message.answer(
        "👋 Salom! Bosh Qotirmalar Botiga xush kelibsiz!\n\n"
        "🎮 O'yinlar:\n"
        "/sudoku - Sudoku o'yini\n\n"
        "Keyinchalik ko'proq o'yinlar qo'shiladi!"
    )

@dp.message(Command("sudoku"))
async def sudoku_start(message: types.Message):
    chat_id = message.chat.id
    solved = generate_solved()
    puzzle = make_puzzle(solved)
    games[chat_id] = {
        'solved': solved,
        'puzzle': [row[:] for row in puzzle],
        'original': [row[:] for row in puzzle],
        'selected': None,
        'msg_id': None
    }
    text = "🧩 *Sudoku boshlandi!*\n\nRaqam tanlang va qatorni kiriting:\n\n"
    text += board_text(chat_id)
    text += "\n\n👆 Qaysi katakni to'ldirmoqchisiz? Masalan: `3 5` (3-qator, 5-ustun)"
    msg = await message.answer(text, parse_mode="Markdown", reply_markup=numpad_keyboard(chat_id))
    games[chat_id]['msg_id'] = msg.message_id

@dp.message(lambda m: m.chat.id in games and not m.text.startswith('/'))
async def handle_position(message: types.Message):
    chat_id = message.chat.id
    game = games[chat_id]
    try:
        parts = message.text.strip().split()
        r, c = int(parts[0])-1, int(parts[1])-1
        if not (0 <= r <= 8 and 0 <= c <= 8):
            await message.answer("❌ 1-9 oralig'ida yozing!")
            return
        if game['original'][r][c] != 0:
            await message.answer("❌ Bu katak o'zgartirib bo'lmaydi!")
            return
        game['selected'] = r*9+c
        text = f"🧩 *Sudoku*\n\n{board_text(chat_id)}\n\n✅ Tanlandi: {r+1}-qator, {c+1}-ustun\nEndi raqam bosing:"
        await message.answer(text, parse_mode="Markdown", reply_markup=numpad_keyboard(chat_id))
    except:
        await message.answer("❌ To'g'ri format: `3 5` (qator ustun)", parse_mode="Markdown")

@dp.callback_query(lambda c: c.data.startswith("num_"))
async def num_click(callback: types.CallbackQuery):
    chat_id = callback.message.chat.id
    if chat_id not in games:
        await callback.answer("Yangi o'yin boshlang: /sudoku")
        return
    game = games[chat_id]
    selected = game.get('selected')
    if selected is None:
        await callback.answer("Avval katak tanlang! Masalan: 3 5")
        return
    r, c = selected//9, selected%9
    num = int(callback.data.split("_")[1])
    game['puzzle'][r][c] = num
    win = all(
        game['puzzle'][i][j] == game['solved'][i][j]
        for i in range(9) for j in range(9)
    )
    text = f"🧩 *Sudoku*\n\n{board_text(chat_id)}\n\nQaysi katakni to'ldirmoqchisiz? Masalan: `3 5`"
    await callback.message.edit_text(text, parse_mode="Markdown", reply_markup=numpad_keyboard(chat_id))
    if win:
        await callback.message.answer("🎉 BARAKALLA! Sudoku yechildi!")
    await callback.answer()

async def main():
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
