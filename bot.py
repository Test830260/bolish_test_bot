import asyncio
import logging
import os
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.utils.keyboard import InlineKeyboardBuilder
import json
import random

BOT_TOKEN = os.getenv("BOT_TOKEN")
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

# Sudoku generator
def generate_solved():
    grid = [[0]*9 for _ in range(9)]
    solve(grid)
    return grid

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

def make_puzzle(solved, removes=40):
    puzzle = [row[:] for row in solved]
    positions = [(r,c) for r in range(9) for c in range(9)]
    random.shuffle(positions)
    for r,c in positions[:removes]:
        puzzle[r][c] = 0
    return puzzle

# O'yinlar saqlash
games = {}

def build_board(chat_id):
    game = games[chat_id]
    puzzle = game['puzzle']
    solved = game['solved']
    selected = game.get('selected', None)
    
    builder = InlineKeyboardBuilder()
    
    for r in range(9):
        for c in range(9):
            val = puzzle[r][c]
            orig = game['original'][r][c]
            idx = r*9+c
            
            if orig != 0:
                text = str(val)
            elif val == 0:
                text = "·"
            elif val == solved[r][c]:
                text = str(val)
            else:
                text = f"✗"
            
            if selected == idx and orig == 0:
                text = f"[{text}]"
            
            builder.button(
                text=text,
                callback_data=f"cell_{idx}"
            )
    
    builder.adjust(9)
    
    # Raqamlar
    numpad = InlineKeyboardBuilder()
    for i in range(1, 10):
        numpad.button(text=str(i), callback_data=f"num_{i}")
    numpad.button(text="✕", callback_data="num_0")
    numpad.adjust(5)
    
    builder.attach(numpad)
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
        'selected': None
    }
    await message.answer(
        "🧩 Sudoku boshlandi!\n\nKatak tanlang, keyin raqam bosing:",
        reply_markup=build_board(chat_id)
    )

@dp.callback_query(lambda c: c.data.startswith("cell_"))
async def cell_click(callback: types.CallbackQuery):
    chat_id = callback.message.chat.id
    if chat_id not in games:
        await callback.answer("Yangi o'yin boshlang: /sudoku")
        return
    
    idx = int(callback.data.split("_")[1])
    r, c = idx//9, idx%9
    game = games[chat_id]
    
    if game['original'][r][c] != 0:
        await callback.answer("Bu katak o'zgartirib bo'lmaydi!")
        return
    
    game['selected'] = idx
    await callback.message.edit_reply_markup(
        reply_markup=build_board(chat_id)
    )
    await callback.answer()

@dp.callback_query(lambda c: c.data.startswith("num_"))
async def num_click(callback: types.CallbackQuery):
    chat_id = callback.message.chat.id
    if chat_id not in games:
        await callback.answer("Yangi o'yin boshlang: /sudoku")
        return
    
    game = games[chat_id]
    selected = game.get('selected')
    
    if selected is None:
        await callback.answer("Avval katak tanlang!")
        return
    
    r, c = selected//9, selected%9
    num = int(callback.data.split("_")[1])
    game['puzzle'][r][c] = num
    
    # G'alaba tekshirish
    win = all(
        game['puzzle'][i][j] == game['solved'][i][j]
        for i in range(9) for j in range(9)
    )
    
    await callback.message.edit_reply_markup(
        reply_markup=build_board(chat_id)
    )
    
    if win:
        await callback.message.answer("🎉 BARAKALLA! Sudoku yechildi!")
    
    await callback.answer()

async def main():
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
